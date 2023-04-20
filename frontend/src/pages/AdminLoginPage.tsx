import { selectCurrentUser } from "@/features/auth/authSlice";
import LoginForm from "@/features/auth/LoginForm";
import { useTypedSelector } from "@/hooks/store";
import { Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import logo from "../assets/react.svg";

const ADMIN_URL = "/admin";

function AdminLoginPage() {
  const user = useTypedSelector(selectCurrentUser);
  return user ? (
    <Navigate to={ADMIN_URL} />
  ) : (
    <div
      className="admin-login-page mx-auto my-5"
      style={{ maxWidth: "26rem" }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center mb-3">
        <Image src={logo} alt="logo" style={{ height: "6rem" }} />
        <h1>EngMan</h1>
      </div>
      <LoginForm redirect={ADMIN_URL} needAdmin={true} />
    </div>
  );
}

export default AdminLoginPage;
