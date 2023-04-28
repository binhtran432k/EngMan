import { useTypedSelector } from "@/hooks/store";
import { Responsive } from "@/utilities/types";
import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { selectCurrentUser } from "../auth/authSlice";
import AuthMenu from "./AuthMenu";
import { getSideItem, MySideSectionItem } from "./MySide";
import UserMenuDropdown from "./UserMenuDropdown";

interface UserMenuProps {
  listResponsive: Responsive;
  responsive: Responsive;
  listItems?: (MySideSectionItem | null)[];
  usefulItems?: MySideSectionItem[];
  userItems?: MySideSectionItem[];
  loginUrl: string;
}

function getUserMenuSection(
  items?: MySideSectionItem[],
  responsive?: Responsive
) {
  return items?.map((item, i) => (
    <Nav.Item
      key={i}
      className={
        responsive &&
        ["d-none", `d-${responsive}-block`].filter(Boolean).join(" ")
      }
    >
      {getSideItem({ item })}
    </Nav.Item>
  ));
}

function UserMenu(props: UserMenuProps) {
  const { t } = useTranslation("UserMenu");
  const user = useTypedSelector(selectCurrentUser);
  const listItems = props.listItems?.filter(Boolean) as
    | MySideSectionItem[]
    | undefined;
  const offCanvasTitle = t("label");

  return (
    <Nav className="d-flex align-items-center">
      {getUserMenuSection(
        listItems?.map((item) => ({
          ...item,
          icon: undefined,
        })),
        props.listResponsive
      )}
      {user ? (
        <>
          {getUserMenuSection(
            props.usefulItems?.map((item) => ({ ...item, label: undefined })),
            props.responsive
          )}
          <UserMenuDropdown
            title={offCanvasTitle}
            responsive={props.responsive}
            sections={[
              {
                title: t("lists"),
                items: listItems,
                responsive: props.listResponsive,
              },
              {
                title: t("useful"),
                items: props.usefulItems,
                responsive: props.responsive,
              },
              { title: t("user"), items: props.userItems },
            ]}
          />
        </>
      ) : (
        <AuthMenu
          title={offCanvasTitle}
          loginUrl={props.loginUrl}
          responsive={props.listResponsive}
          sections={[{ title: t("lists"), items: listItems }]}
        />
      )}
    </Nav>
  );
}

export default UserMenu;
