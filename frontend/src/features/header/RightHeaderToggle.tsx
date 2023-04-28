import MyNavIcon from "@/components/MyNavIcon";
import { useAppDispatch } from "@/hooks/store";
import { Responsive } from "@/utilities/types";
import { ReactNode } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { toggleRightHeader } from "./headerSlice";

interface RightToggleProps {
  responsive?: Responsive;
  children?: ReactNode | ReactNode[];
}

function RightHeaderToggle(props: RightToggleProps) {
  const dispatch = useAppDispatch();
  return (
    <MyNavIcon
      onClick={() => dispatch(toggleRightHeader())}
      responsive={props.responsive}
    >
      {props.children ?? <FaEllipsisH />}
    </MyNavIcon>
  );
}

export default RightHeaderToggle;
