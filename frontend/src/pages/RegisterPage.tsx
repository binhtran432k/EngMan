import RegisterForm from "@/features/register/RegisterForm";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";

interface RegisterPageProps {
  loginUrl: string;
}

function RegisterPage(props: RegisterPageProps) {
  const { t } = useTranslation("RegisterPage");

  return (
    <Card className="RegisterPage mx-auto my-5">
      <Card.Header as="h5">{t("label")}</Card.Header>
      <Card.Body>
        <RegisterForm loginUrl={props.loginUrl} />
        <div className="text-center mt-4">
          <span>{t("haveAccount")}?</span>
          &nbsp;
          <LinkContainer to={props.loginUrl} className="btnLoginNavigationLink">
            <a>{t("loginNow")}</a>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RegisterPage;
