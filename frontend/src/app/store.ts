import authReducer from "@/features/auth/authSlice";
import toastReducer from "@/features/toast/toastSlice";
import headerReducer from "@/features/header/headerSlice";
import { configureStore } from "@reduxjs/toolkit";
import api from "./services/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    toast: toastReducer,
    header: headerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
