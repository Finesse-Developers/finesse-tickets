import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PlainButton } from "../../components/PlainButton";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        height: "100%",
        // border: "1px solid white",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: "white" }} variant="h2">
        Welcome to Finesse Tickets
      </Typography>
      <Box sx={{ mt: 4, gap: 5, display: "flex", justifyContent: "center" }}>
        {!user && (
          <Link to={`http://localhost:6969/auth`}>
            <PlainButton>
              <Typography>Login</Typography>
            </PlainButton>
          </Link>
        )}
        <Link to={"/dashboard"}>
          <PlainButton>
            <Typography>Dashboard</Typography>
          </PlainButton>
        </Link>
      </Box>
    </Box>
  );
}
