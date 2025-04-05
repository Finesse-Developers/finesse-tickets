import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthProtectedRoutes = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export function redirectToHomeIfNotAuth(
  res: Response,
  nav: ReturnType<typeof useNavigate>
) {
  if ([401, 403].includes(res.status)) {
    nav("/");
  }
}

export default AuthProtectedRoutes;
