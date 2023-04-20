import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/PrivateComponent";
import RoleBaseComponent from "./components/RoleBaseComponent";
import ToastModal from "./features/toast/ToastModal";
import Admin from "./layouts/Admin";
import Normal from "./layouts/Normal";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const Roles = {
  Admin: "ROLE_ADMIN",
  Instructor: "ROLE_INSTRUCTOR",
  Academy: "ROLE_ACADEMY",
  Basic: "ROLE_BASIC",
};

const LOGIN_URL = "/login";
const ADMIN_LOGIN_URL = "/admin/login";
const HOME_URL = "/";

const router = createBrowserRouter([
  {
    path: HOME_URL,
    element: (
      <Normal>
        <Outlet />
      </Normal>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute url={LOGIN_URL}>
            <Outlet />
          </PrivateRoute>
        ),
      },
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: (
          <Admin>
            <PrivateRoute url={ADMIN_LOGIN_URL}>
              <RoleBaseComponent
                role={Roles.Admin}
                fallback={<div>Unauthorized</div>}
              >
                <Outlet />
              </RoleBaseComponent>
            </PrivateRoute>
          </Admin>
        ),
        children: [{ index: true, element: <HomePage /> }],
      },
      { path: "login", element: <AdminLoginPage /> },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
      <ToastModal />
    </div>
  );
}

export default App;
