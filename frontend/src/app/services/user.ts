import api, { ApiError, DEFAULT_API_ERROR } from "./api";
import * as yup from "yup";
import HttpStatus from "@/constants/HttpStatus";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const _userSchema = {
  username: yup
    .string()
    .matches(/^(|[a-zA-Z0-9_-]{3,50})$/, "username.missPattern#3,50"),
  firstName: yup.string().max(50, "firstName.max#50"),
  lastName: yup.string().max(50, "lastName.max#50"),
  email: yup
    .string()
    .matches(
      /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/,
      "email.invalid"
    ),
  phone: yup.string().matches(/^[0-9]{10}$/, "phone.invalid"),
  sex: yup.string().oneOf(["Male", "Female"], "sex.invalid"),
  dateOfBirth: yup.date().max(new Date(), "dateOfBirth.invalid"),
} as const;

const _passwordCreationSchema = {
  password: yup
    .string()
    .matches(/^(|.{8,50})$/, "password.minMax#8,50")
    .required("password.required"),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password")], "retypePassword.missMatch#password")
    .required("retypePassword.required"),
} as const;

const userCreationSchema = yup.object({
  ..._userSchema,
  username: _userSchema.username.required("username.required"),
  ..._passwordCreationSchema,
});

type UserCreationRequest = yup.InferType<typeof userCreationSchema>;

interface UserExtra {
  id: string;
  createTime: Date;
  updateTime: Date;
  roles: string[];
}

type User = Omit<UserCreationRequest, "password" | "retypePassword"> &
  UserExtra;

const USER_PATH = "users";

const userService = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<User, UserCreationRequest>({
      query: (user) => ({
        url: USER_PATH,
        method: "POST",
        body: user,
      }),
    }),
  }),
  overrideExisting: false,
});

function getRegisterError(error?: FetchBaseQueryError): ApiError {
  if (error?.status === HttpStatus.CONFLICT) {
    return ["register.title", "register.exists"];
  }
  return DEFAULT_API_ERROR;
}

export { userCreationSchema, getRegisterError };
export type { User, UserCreationRequest };
export const { useRegisterUserMutation } = userService;
export default userService;
