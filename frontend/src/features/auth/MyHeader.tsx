import logo from "@/assets/react.svg";
import { selectCurrentUser, unsetCredentials } from "@/features/auth/authSlice";
import UserMenu from "@/features/header/UserMenu";
import { useAppDispatch, useTypedSelector } from "@/hooks/store";
import { Responsive } from "@/utilities/types";
import { Container, Image, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaArrowLeft,
  FaBell,
  FaBook,
  FaBookOpen,
  FaChalkboard,
  FaChalkboardTeacher,
  FaHeart,
  FaSchool,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import LeftHeaderToggle from "../header/LeftHeaderToggle";
import MyNav from "../header/MyNav";

interface MyHeaderProps {
  homeUrl: string;
  loginUrl: string;
}

const RESPONSIVE: Responsive = "md";

function MyHeader(props: MyHeaderProps) {
  const { t } = useTranslation("Navbar");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useTypedSelector(selectCurrentUser);

  return (
    <NavbarBS className="MyHeader border-bottom position-relative">
      <Container fluid>
        <Nav>
          <Nav.Item>
            <LeftHeaderToggle responsive={RESPONSIVE} />
          </Nav.Item>
        </Nav>
        <LinkContainer to={props.homeUrl}>
          <NavbarBS.Brand className={`me-0 me-${RESPONSIVE}-2`}>
            <Image src={logo} alt="logo" /> EngMan
          </NavbarBS.Brand>
        </LinkContainer>
        <MyNav
          title={t("label")}
          responsive={RESPONSIVE}
          items={[
            { label: t("searchCourse"), icon: <FaBookOpen /> },
            { label: t("searchClass"), icon: <FaChalkboard /> },
          ]}
        />
        <UserMenu
          listResponsive={"lg"}
          responsive={RESPONSIVE}
          loginUrl={props.loginUrl}
          listItems={[
            { label: t("academy"), icon: <FaSchool /> },
            { label: t("instructor"), icon: <FaChalkboardTeacher /> },
            user && { label: t("myLearning"), icon: <FaBook /> },
          ]}
          usefulItems={[
            { icon: <FaHeart />, label: t("wishlist") },
            {
              icon: <FaBell />,
              label: t("notification"),
            },
          ]}
          userItems={[
            {
              icon: <FaArrowLeft />,
              className: "btnLogout",
              label: t("logout"),
              onClick: () => {
                dispatch(unsetCredentials());
                navigate(props.loginUrl);
              },
            },
          ]}
        />
      </Container>
    </NavbarBS>
  );
}

export default MyHeader;
