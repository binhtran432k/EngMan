import { selectCurrentUser, unsetCredentials } from "@/features/auth/authSlice";
import { useTypedSelector } from "@/hooks/store";
import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar as NavbarBS,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { useTranslation } from "react-i18next";
import { FaBars, FaBell, FaHeart, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import category from "../constants/category.json";
import SearchBox from "./SearchBox";
import UserIcon from "./UserIcon";

enum HeaderId {
  Category = "category",
  Search = "search",
}
const navResponsive = "md";
const searchResponsive = "lg";
const mobileIconStyle = "d-flex align-items-center fs-3";
const mobileExtraIconStyle = "d-none d-lg-block";

function MyNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toggleNav = () => setIsNavOpen((x) => !x);
  const toggleSearch = () => setIsSearchOpen((x) => !x);
  const user = useTypedSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <NavbarBS className="header border-bottom">
      <Container fluid>
        <Nav.Item>
          <Nav.Link
            onClick={toggleNav}
            className={`d-${navResponsive}-none ${mobileIconStyle}`}
          >
            <FaBars />
          </Nav.Link>
        </Nav.Item>
        <LinkContainer to="/">
          <NavbarBS.Brand className={`me-0 me-${navResponsive}-2`}>
            <Image src={logo} alt="logo" /> EngMan
          </NavbarBS.Brand>
        </LinkContainer>
        <Offcanvas
          responsive={navResponsive}
          show={isNavOpen}
          onHide={toggleNav}
          onShow={() => setIsFirstOpen(true)}
          className="flex-fill"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{t("navbar")}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-fill">
              <NavDropdownMenu
                title={t("category.label")}
                show={isFirstOpen}
                onToggle={() => setIsFirstOpen((x) => !x)}
              >
                {Object.entries(category).map(([group, courses], i) => {
                  return (
                    <DropdownSubmenu
                      key={i}
                      title={t(`category.${group}`) ?? ""}
                    >
                      {courses.map(({ id, code, option }) => (
                        <NavDropdown.Item
                          key={id}
                          id={id}
                          href={`#${group}/${id}`}
                        >
                          {t(code, option)}
                        </NavDropdown.Item>
                      ))}
                    </DropdownSubmenu>
                  );
                })}
              </NavDropdownMenu>
              <Offcanvas
                id={HeaderId.Search}
                show={isSearchOpen}
                onHide={toggleSearch}
                placement="top"
                responsive={searchResponsive}
                className="flex-fill"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>{t("search")}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <SearchBox />
                </Offcanvas.Body>
              </Offcanvas>
              <Nav.Item>
                <Nav.Link>{t("academy")}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>{t("instructor")}</Nav.Link>
              </Nav.Item>
              {user && (
                <Nav.Item>
                  <Nav.Link>{t("myLearning")}</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <Nav className="d-flex align-items-center">
          <Nav.Item>
            <Nav.Link
              onClick={toggleSearch}
              className={`d-${searchResponsive}-none ${mobileIconStyle}`}
            >
              <FaSearch />
            </Nav.Link>
          </Nav.Item>
          {user ? (
            <>
              <Nav.Item className={`${mobileExtraIconStyle}`}>
                <Nav.Link>
                  <FaHeart />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={`${mobileExtraIconStyle}`}>
                <Nav.Link>
                  <FaBell />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Dropdown align="end">
                  <Dropdown.Toggle className="btnUserAction pe-0" as={Nav.Link}>
                    <UserIcon
                      firstName={user.firstName}
                      lastName={user.lastName}
                      size="2rem"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="btnLogout"
                      onClick={() => {
                        dispatch(unsetCredentials());
                        navigate("/login");
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <LinkContainer to="/login">
                <Button className="btnLoginNavigation">{t("logIn")}</Button>
              </LinkContainer>
            </Nav.Item>
          )}
        </Nav>
      </Container>
    </NavbarBS>
  );
}

export default MyNavbar;
