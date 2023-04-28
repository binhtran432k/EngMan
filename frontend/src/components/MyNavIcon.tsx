import { Responsive } from "@/utilities/types";
import { ReactNode } from "react";
import { Nav } from "react-bootstrap";

interface MyNavIconProps {
  onClick: () => void;
  responsive?: Responsive;
  children?: ReactNode | ReactNode[];
}

function MyNavIcon(props: MyNavIconProps) {
  return (
    <Nav.Link
      onClick={props.onClick}
      className={[
        props.responsive && `d-${props.responsive}-none`,
        "d-flex align-items-center fs-3",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {props.children}
    </Nav.Link>
  );
}

export default MyNavIcon;
