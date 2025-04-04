import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PlainButton } from "../../components/PlainButton";

export default function Home() {
  return (
    <Box>
      <Typography sx={{ color: "white" }} variant="h2">
        Welcome to Finesse Tickets
      </Typography>
      <Box sx={{ mt: 4, gap: 5, display: "flex", justifyContent: "center" }}>
        <Link to={"/login"}>
          <PlainButton>
            <Typography>Login</Typography>
          </PlainButton>
        </Link>
        <Link to={"/dashboard"}>
          <PlainButton>
            <Typography>Dashboard</Typography>
          </PlainButton>
        </Link>
      </Box>
    </Box>
  );
}
