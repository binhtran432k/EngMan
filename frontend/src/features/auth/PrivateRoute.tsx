import { useTypedSelector } from "@/hooks/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "./authSlice";

interface PrivateRouteProps {
  url: string;
  children: ReactNode[] | ReactNode;
}

function PrivateRoute(props: PrivateRouteProps) {
  const user = useTypedSelector(selectCurrentUser);
  return !user ? <Navigate to={props.url} /> : <>{props.children}</>;
}

export default PrivateRoute;
