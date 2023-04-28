import { useTypedSelector } from "@/hooks/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "./authSlice";

interface AuthRouteProps {
  url: string;
  children: ReactNode[] | ReactNode;
}

function AuthRoute(props: AuthRouteProps) {
  const user = useTypedSelector(selectCurrentUser);
  return user ? <Navigate to={props.url} /> : <>{props.children}</>;
}

export default AuthRoute;
