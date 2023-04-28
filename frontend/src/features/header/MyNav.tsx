import { useAppDispatch, useTypedSelector } from "@/hooks/store";
import { Responsive } from "@/utilities/types";
import { Nav, Offcanvas } from "react-bootstrap";
import { selectLeftHeaderToggle, setLeftHeaderToggle } from "./headerSlice";
import { getSideItem, MySideSectionItem } from "./MySide";

interface MyNavProps {
  title: string;
  items: (MySideSectionItem | null)[];
  responsive: Responsive;
}

function MyNav(props: MyNavProps) {
  const isShow = useTypedSelector(selectLeftHeaderToggle);
  const dispatch = useAppDispatch();

  return (
    <Offcanvas
      responsive={props.responsive}
      show={isShow}
      onHide={() => dispatch(setLeftHeaderToggle(false))}
      className="flex-fill"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{props.title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-fill">
          {props.items.filter(Boolean).map((item, i) => (
            <Nav.Item key={i}>{getSideItem({ item: item! })}</Nav.Item>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MyNav;
