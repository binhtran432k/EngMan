import MyHeader from "@/features/auth/MyHeader";
import { ReactNode } from "react";

interface NormalProps {
  homeUrl: string;
  loginUrl: string;
  children?: ReactNode | ReactNode[];
}

function Normal({ children, homeUrl, loginUrl }: NormalProps) {
  return (
    <div className="normal d-flex flex-column">
      <MyHeader homeUrl={homeUrl} loginUrl={loginUrl} />
      {children}
    </div>
  );
}

export default Normal;
