import {
  authSchema,
  getLoginError,
  LoginRequest,
  useCreateAdminAuthMutation,
  useCreateAuthMutation,
} from "@/app/services/auth";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openToast } from "../toast/toastSlice";
import MyForm from "@/components/MyForm";
import { setCredentials } from "./authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginFormProps {
  needAdmin?: boolean;
  redirect: string;
}

function LoginForm({ redirect, needAdmin = false }: LoginFormProps) {
  const { t } = useTranslation();
  const { t: tv } = useTranslation("validation");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(authSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useCreateAuthMutation();
  const [loginAsAdmin, { isLoading: isLoadingAdmin }] =
    useCreateAdminAuthMutation();
  const realLogin = needAdmin ? loginAsAdmin : login;
  const realIsLoading = needAdmin ? isLoadingAdmin : isLoading;

  return (
    <MyForm
      className="LoginForm"
      register={register}
      errors={errors}
      onSubmit={handleSubmit((data) =>
        realLogin(data)
          .unwrap()
          .then((auth) => {
            dispatch(setCredentials(auth));
            navigate(redirect);
          })
          .catch((error) => {
            const [title, message] = getLoginError(error);
            dispatch(
              openToast({
                title: tv(title),
                body: tv(message),
              })
            );
          })
      )}
      groups={[
        [{ name: "username" }],
        [{ type: "password", name: "password" }],
      ]}
      remain={
        <Button
          className="btnLogin w-100"
          disabled={realIsLoading}
          type="submit"
        >
          {t("login")}
        </Button>
      }
    />
  );
}

export default LoginForm;
