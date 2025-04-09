import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";

const AuthProtectedRoutes = () => {
  const { user, loading } = useAuth();

  // Wait for loading state to be finished before checking the user
  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
