import api from "./api";

interface LoginRequest {
  username: string;
  password: string;
}

interface User {
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  token: string;
}

const authSlice = api.injectEndpoints({
  endpoints: (build) => ({
    createAuth: build.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
    }),
    createAdminAuth: build.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: "auth/admin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export type { User, LoginRequest };
export const { useCreateAuthMutation, useCreateAdminAuthMutation } = authSlice;
export default authSlice;
