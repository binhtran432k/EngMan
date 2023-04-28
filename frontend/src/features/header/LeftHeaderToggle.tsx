import MyNavIcon from "@/components/MyNavIcon";
import { useAppDispatch } from "@/hooks/store";
import { Responsive } from "@/utilities/types";
import { ReactNode } from "react";
import { FaBars } from "react-icons/fa";
import { toggleLeftHeader } from "./headerSlice";

interface LeftToggleProps {
  responsive: Responsive;
  children?: ReactNode | ReactNode[];
}

function LeftHeaderToggle(props: LeftToggleProps) {
  const dispatch = useAppDispatch();
  return (
    <MyNavIcon
      onClick={() => dispatch(toggleLeftHeader())}
      responsive={props.responsive}
    >
      {props.children ?? <FaBars />}
    </MyNavIcon>
  );
}

export default LeftHeaderToggle;
