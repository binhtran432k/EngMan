import {
  LoginRequest,
  useCreateAdminAuthMutation,
  useCreateAuthMutation,
} from "@/app/services/auth";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { openToast } from "../toast/toastSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormProps {
  needAdmin?: boolean;
  redirect: string;
}

function LoginForm({ redirect, needAdmin = false }: LoginFormProps) {
  const { t } = useTranslation();
  const { t: tv } = useTranslation("validation");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const [login, { isLoading }] = useCreateAuthMutation();
  const [loginAsAdmin, { isLoading: isLoadingAdmin }] =
    useCreateAdminAuthMutation();
  const realLogin = needAdmin ? loginAsAdmin : login;
  const realIsLoading = needAdmin ? isLoadingAdmin : isLoading;

  return (
    <Form
      className="d-flex flex-column gap-3"
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          const user = await realLogin(formState).unwrap();
          dispatch(setCredentials(user));
          navigate(redirect);
        } catch (_) {
          dispatch(
            openToast({
              title: tv("loginFail.label"),
              body: tv("loginFail.message"),
            })
          );
        }
      }}
    >
      <Form.Group>
        <Form.Label>{t("form.username")}</Form.Label>
        <Form.Control
          className="txtUsername"
          onChange={handleChange}
          name="username"
          placeholder={t("form.username") ?? "Username"}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>{t("form.password")}</Form.Label>
        <InputGroup>
          <Form.Control
            className="txtPassword"
            onChange={handleChange}
            name="password"
            type={isShowPassword ? "text" : "password"}
            placeholder={t("form.password") ?? "Password"}
          />
          <Button onClick={() => setIsShowPassword((s) => !s)}>
            {isShowPassword ? <FaEye /> : <FaEyeSlash />}
          </Button>
        </InputGroup>
      </Form.Group>
      <Button className="btnLogin" disabled={realIsLoading} type="submit">
        {t("logIn")}
      </Button>
    </Form>
  );
}

export default LoginForm;
