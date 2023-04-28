import LoginForm from "@/features/auth/LoginForm";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";

interface LoginPageProps {
  homeUrl: string;
  registerUrl: string;
}

function LoginPage(props: LoginPageProps) {
  const { t } = useTranslation("LoginPage");

  return (
    <Card className="LoginPage mx-auto my-5">
      <Card.Header as="h5">{t("label")}</Card.Header>
      <Card.Body>
        <LoginForm redirect={props.homeUrl} />
        <div className="text-center mt-4">
          <span>{t("notHaveAccount")}?</span>
          &nbsp;
          <LinkContainer
            to={props.registerUrl}
            className="btnRegisterNavigationLink"
          >
            <a>{t("registerNow")}</a>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LoginPage;
