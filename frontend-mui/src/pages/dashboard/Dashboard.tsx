import { Box, CircularProgress, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useDiscordServer } from "../../context/DiscordServerContext";

export default function Dashboard() {
  const { discordServer, loading, error } = useDiscordServer();

  if (loading && !discordServer) {
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

  if (error || !discordServer) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" color="white">
          {!discordServer
            ? "Failed to fetch data from the discord server"
            : error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "auto",
        // border: "1px solid red",
      }}
    >
      <Sidebar discordServer={discordServer} />
      <Outlet />
    </Box>
  );
}
