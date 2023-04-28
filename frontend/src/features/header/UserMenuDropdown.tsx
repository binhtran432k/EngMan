import { AuthDetails } from "@/app/services/auth";
import UserIcon from "@/components/UserIcon";
import { useAppDispatch, useTypedSelector } from "@/hooks/store";
import { Responsive } from "@/utilities/types";
import { Dropdown, Nav, Offcanvas } from "react-bootstrap";
import { selectCurrentUser } from "../auth/authSlice";
import { selectRightHeaderToggle, setRightHeaderToggle } from "./headerSlice";
import MySide, {
    getSideItem,
    MySideSection,
    MySideSectionItem
} from "./MySide";

interface UserMenuSection extends MySideSection {
  responsive?: Responsive;
}

interface UserMenuDropdownProps {
  title: string;
  sections: UserMenuSection[];
  responsive: Responsive;
}

function getUserItem(user: AuthDetails): MySideSectionItem {
  return {
    icon: (
      <div style={{ minWidth: "4rem", minHeight: "4rem" }}>
        <UserIcon
          username={user.username}
          firstName={user.firstName}
          lastName={user.lastName}
          size="4rem"
        />
      </div>
    ),
    label: (
      <div
        style={{
          whiteSpace: "normal",
          minWidth: "6rem",
        }}
        className="d-flex align-items-center"
      >
        {!user.firstName && !user.lastName
          ? user.username
          : [user.firstName, user.lastName].join(" ")}
      </div>
    ),
  };
}

function UserMenuDropdown(props: UserMenuDropdownProps) {
  const dispatch = useAppDispatch();
  const isShow = useTypedSelector(selectRightHeaderToggle);
  const user = useTypedSelector(selectCurrentUser);
  const lastIndex = props.sections.length - 1;

  return (
    user && (
      <Nav.Item>
        <Dropdown
          className="MyDropdown"
          align="end"
          onToggle={(show) => dispatch(setRightHeaderToggle(show))}
          show={isShow}
        >
          <Dropdown.Toggle className="btnUserMenuToggle pe-0" as={Nav.Link}>
            <UserIcon
              username={user.username}
              firstName={user.firstName}
              lastName={user.lastName}
              size="2rem"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu
            className={["d-none", isShow && `d-${props.responsive}-block`]
              .filter(Boolean)
              .join(" ")}
          >
            {getSideItem({ item: getUserItem(user), as: Dropdown.Item })}
            <Dropdown.Divider />
            {props.sections.map((section, i) => (
              <div
                key={i}
                className={section.responsive && `d-${section.responsive}-none`}
              >
                {section?.items?.map((item, j) =>
                  getSideItem({ item, key: j, as: Dropdown.Item })
                )}
                {lastIndex != i && section?.items && <Dropdown.Divider />}
              </div>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Offcanvas
          className="MyOffcanvas"
          responsive={props.responsive}
          show={isShow}
          onHide={() => dispatch(setRightHeaderToggle(false))}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{props.title}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={`d-block d-${props.responsive}-none`}>
            <div className="pb-3">
              {getSideItem({ item: getUserItem(user) })}
            </div>
            <MySide
              sections={props.sections}
              onClick={() => dispatch(setRightHeaderToggle(false))}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </Nav.Item>
    )
  );
}

export default UserMenuDropdown;
