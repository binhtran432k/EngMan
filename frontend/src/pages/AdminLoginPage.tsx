import LoginForm from "@/features/auth/LoginForm";
import { Image } from "react-bootstrap";
import logo from "../assets/react.svg";

const ADMIN_URL = "/admin";

function AdminLoginPage() {
  return (
    <div className="AdminLoginPage mx-auto my-5" style={{ maxWidth: "26rem" }}>
      <div className="d-flex flex-column align-items-center justify-content-center mb-3">
        <Image src={logo} alt="logo" style={{ height: "6rem" }} />
        <h1>EngMan</h1>
      </div>
      <LoginForm redirect={ADMIN_URL} needAdmin />
    </div>
  );
}

export default AdminLoginPage;
