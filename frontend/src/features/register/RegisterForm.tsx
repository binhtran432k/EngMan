import { getLoginError, useCreateAuthMutation } from "@/app/services/auth";
import {
  getRegisterError,
  UserCreationRequest,
  userCreationSchema,
  useRegisterUserMutation,
} from "@/app/services/user";
import MyForm from "@/components/MyForm";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../auth/authSlice";
import { openToast } from "../toast/toastSlice";

interface RegisterFormProps {
  loginUrl: string;
}

function RegisterForm(props: RegisterFormProps) {
  const { t } = useTranslation();
  const { t: tv } = useTranslation("validation");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreationRequest>({
    resolver: yupResolver(userCreationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [login, { isLoading: isLoginLoading }] = useCreateAuthMutation();

  return (
    <MyForm
      className="RegisterForm"
      onSubmit={handleSubmit((data) =>
        registerUser(data)
          .unwrap()
          .then(() => {
            login({
              username: data.username,
              password: data.password,
            })
              .unwrap()
              .then((auth) => {
                dispatch(setCredentials(auth));
                navigate(props.loginUrl);
              })
              .catch((error) => {
                const [title, message] = getLoginError(error);
                dispatch(
                  openToast({
                    title: tv(title),
                    body: tv(message),
                  })
                );
              });
          })
          .catch((error) => {
            const [title, message] = getRegisterError(error);
            dispatch(
              openToast({
                title: tv(title),
                body: tv(message),
              })
            );
          })
      )}
      register={register}
      errors={errors}
      groups={[
        [{ name: "firstName" }, { name: "lastName" }],
        [{ name: "username", required: true }],
        [
          { type: "password", name: "password", required: true },
          { type: "password", name: "retypePassword", required: true },
        ],
      ]}
      remain={
        <Button
          className="btnCreateAccount w-100"
          disabled={isLoading || isLoginLoading}
          type="submit"
        >
          {t("createAccount")}
        </Button>
      }
    />
  );
}

export default RegisterForm;
