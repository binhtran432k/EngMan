import api, { ApiError, DEFAULT_API_ERROR } from "./api";
import * as yup from "yup";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import HttpStatus from "@/constants/HttpStatus";

const authSchema = yup.object({
  username: yup.string().required("username.required"),
  password: yup.string().required("password.required"),
});

type LoginRequest = yup.InferType<typeof authSchema>;

interface AuthDetails {
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  token: string;
}

const authService = api.injectEndpoints({
  endpoints: (build) => ({
    createAuth: build.mutation<AuthDetails, LoginRequest>({
      query: (credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
    }),
    createAdminAuth: build.mutation<AuthDetails, LoginRequest>({
      query: (credentials) => ({
        url: "auth/admin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

function getLoginError(error?: FetchBaseQueryError): ApiError {
  if (error?.status === HttpStatus.NOT_FOUND) {
    return ["login.title", "login.message"];
  }
  return DEFAULT_API_ERROR;
}

export type { AuthDetails, LoginRequest };
export { authSchema, getLoginError };
export const { useCreateAuthMutation, useCreateAdminAuthMutation } =
  authService;
export default authService;
