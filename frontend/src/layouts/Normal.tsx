import MyNavbar from "@/components/MyNavbar";
import { ReactNode } from "react";

interface NormalProps {
  children?: ReactNode | ReactNode[];
}

function Normal({ children }: NormalProps) {
  return (
    <div className="normal d-flex flex-column">
      <MyNavbar />
      {children}
    </div>
  );
}

export default Normal;
