import { useAppDispatch, useTypedSelector } from "@/hooks/store";
import { Responsive } from "@/utilities/types";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import MySide, { MySideSection } from "./MySide";
import RightHeaderToggle from "./RightHeaderToggle";
import { selectRightHeaderToggle, setRightHeaderToggle } from "./headerSlice";

interface AuthMenuProps {
  title: string;
  responsive: Responsive;
  loginUrl: string;
  sections: MySideSection[];
}

function AuthMenu(props: AuthMenuProps) {
  const { t } = useTranslation();
  const isShow = useTypedSelector(selectRightHeaderToggle);
  const dispatch = useAppDispatch();

  return (
    <>
      <Nav.Item>
        <RightHeaderToggle responsive={props.responsive} />
      </Nav.Item>
      <Offcanvas
        responsive={props.responsive}
        show={isShow}
        onHide={() => dispatch(setRightHeaderToggle(false))}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={`d-block d-${props.responsive}-none`}>
            <MySide
              sections={props.sections}
              onClick={() => dispatch(setRightHeaderToggle(false))}
            />
          </div>
          <Nav.Item className="p-2">
            <LinkContainer to={props.loginUrl}>
              <Button
                className="btnLoginNavigation"
                onClick={() => dispatch(setRightHeaderToggle(false))}
              >
                {t("login")}
              </Button>
            </LinkContainer>
          </Nav.Item>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AuthMenu;
