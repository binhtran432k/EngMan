import { ReactNode } from "react";

interface AdminProps {
  children: ReactNode[] | ReactNode;
}

const Admin = (props: AdminProps) => {
  return <div className="admin">{props.children}</div>;
};

export default Admin;
