import { AuthDetails } from "@/app/services/auth";
import { RootState } from "@/app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

interface AuthState {
  user: AuthDetails | null;
  token: string | null;
}

interface AuthToken {
  exp: number;
  iat: number;
  firstName: string;
  lastName: string;
  roles: string;
  sub: string;
}

const TokenUtility = {
  key: "token",
  save(token: string) {
    localStorage.setItem(this.key, token);
  },
  get() {
    return localStorage.getItem(this.key);
  },
  delete() {
    localStorage.removeItem(this.key);
  },
} as const;

function getUserFromToken(token: string | null): AuthDetails | null {
  if (token) {
    const decodedJwt = jwtDecode<AuthToken>(token);
    return {
      firstName: decodedJwt.firstName,
      lastName: decodedJwt.lastName,
      username: decodedJwt.sub,
      roles: decodedJwt.roles.split(","),
      token,
    };
  }
  return null;
}

const userToken = TokenUtility.get() ?? null;

const user = getUserFromToken(userToken);

const slice = createSlice({
  name: "auth",
  initialState: { user: user, token: userToken } as AuthState,
  reducers: {
    setCredentials: (state, { payload: user }: PayloadAction<AuthDetails>) => {
      TokenUtility.save(user.token);
      state.user = user;
      state.token = user.token;
    },
    unsetCredentials: (state) => {
      TokenUtility.delete();
      state.user = null;
      state.token = null;
    },
  },
});

const authReducer = slice.reducer;

const selectCurrentUser = (state: RootState) => state.auth.user;

export const { setCredentials, unsetCredentials } = slice.actions;
export { selectCurrentUser, getUserFromToken };
export default authReducer;
