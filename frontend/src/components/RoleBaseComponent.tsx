import { selectCurrentUser } from "@/features/auth/authSlice";
import { useTypedSelector } from "@/hooks/store";
import { ReactNode } from "react";

interface RoleBaseComponentProps {
  role: string;
  fallback: ReactNode;
  children: ReactNode[] | ReactNode;
}

function RoleBaseComponent(props: RoleBaseComponentProps) {
  const user = useTypedSelector(selectCurrentUser);
  return !user || !user.roles.includes(props.role) ? (
    <>{props.fallback}</>
  ) : (
    <>{props.children}</>
  );
}

export default RoleBaseComponent;
