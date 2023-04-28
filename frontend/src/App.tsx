import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthRoute from "./features/auth/AuthRoute";
import PrivateRoute from "./features/auth/PrivateRoute";
import RoleBaseComponent from "./features/auth/RoleBaseComponent";
import ToastModal from "./features/toast/ToastModal";
import Admin from "./layouts/Admin";
import Normal from "./layouts/Normal";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const Roles = {
  Admin: "ROLE_ADMIN",
  Instructor: "ROLE_INSTRUCTOR",
  Academy: "ROLE_ACADEMY",
  Basic: "ROLE_BASIC",
} as const;

const Endpoints = {
  index: "/",
  Login: "/login",
  Register: "/register",
  Admin: {
    index: "/admin",
    Login: "/admin/login",
  },
} as const;

const router = createBrowserRouter([
  {
    path: Endpoints.index,
    element: (
      <Normal homeUrl={Endpoints.index} loginUrl={Endpoints.Login}>
        <Outlet />
      </Normal>
    ),
    children: [
      {
        path: Endpoints.index,
        element: (
          <PrivateRoute url={Endpoints.Login}>
            <Outlet />
          </PrivateRoute>
        ),
      },
      {
        path: Endpoints.index,
        element: (
          <AuthRoute url={Endpoints.index}>
            <Outlet />
          </AuthRoute>
        ),
        children: [
          {
            path: Endpoints.Login,
            element: (
              <LoginPage
                homeUrl={Endpoints.index}
                registerUrl={Endpoints.Register}
              />
            ),
          },
          {
            path: Endpoints.Register,
            element: <RegisterPage loginUrl={Endpoints.Login} />,
          },
        ],
      },
      { index: true, element: <HomePage /> },
    ],
  },
  {
    path: Endpoints.Admin.index,
    children: [
      {
        path: Endpoints.Admin.index,
        element: (
          <Admin>
            <PrivateRoute url={Endpoints.Admin.Login}>
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
      {
        path: Endpoints.Admin.Login,
        element: (
          <AuthRoute url={Endpoints.Admin.index}>
            <AdminLoginPage />
          </AuthRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastModal />
    </div>
  );
}

export default App;
