import { selectCurrentUser } from "@/features/auth/authSlice";
import LoginForm from "@/features/auth/LoginForm";
import { useTypedSelector } from "@/hooks/store";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

const HOME_URL = "/";

function LoginPage() {
  const { t } = useTranslation();
  const user = useTypedSelector(selectCurrentUser);
  return user ? (
    <Navigate to={HOME_URL} />
  ) : (
    <div className="login-page">
      <Card className="mx-auto my-5" style={{ maxWidth: "26rem" }}>
        <Card.Header as="h5">{t("loginLabel")}</Card.Header>
        <Card.Body>
          <LoginForm redirect={HOME_URL} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
