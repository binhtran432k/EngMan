import { ValidationString } from "@/locales/i18n";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? "/api",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
type ApiError = [ValidationString, ValidationString];
const DEFAULT_API_ERROR: ApiError = ["system.title", "system.message"];

export { DEFAULT_API_ERROR };
export type { ApiError };
export default api;
