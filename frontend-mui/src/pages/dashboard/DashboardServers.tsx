import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PlainButton } from "../../components/PlainButton";
import DashboardCard from "../../components/DashboardCard";
import { useDiscordServer } from "../../context/DiscordServerContext";

export default function DashboardServers() {
  const { user, loading } = useAuth();
  const { getAllAdminServers, adminServers, error, adminServersLoading } =
    useDiscordServer();
  const hasFetchedRef = useRef(false);
  const nav = useNavigate();

  useEffect(() => {
    console.log("user:", user, "loading:", loading);

    if (hasFetchedRef.current) return; // Prevent double fetching
    hasFetchedRef.current = true;

    if (!loading) {
      if (user) {
        getAllAdminServers();
      } else {
        nav("/"); // Redirect to home if user is not logged in
      }
    }
  }, [user, nav, loading]);

  if (loading || adminServersLoading)
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

  return (
    <Container
      sx={{
        padding: 3.5,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        height: "100%",
        overflow: "auto",
        // border: "1px solid red",
      }}
    >
      <Link
        to={
          "https://discord.com/oauth2/authorize?client_id=1354785979843608637&scope=bot&permissions=8"
        }
        target="_blank"
        style={{
          marginBottom: 20,
          textDecoration: "none",
          alignSelf: "flex-end",
        }}
      >
        <PlainButton>+ Add Server</PlainButton>
      </Link>
      <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {error ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              minHeight: "300px",
            }}
          >
            <Typography variant="h5" width={250}>
              {error}
            </Typography>
          </Box>
        ) : (
          adminServers.map((server) => (
            <DashboardCard key={server.id} server={server} />
          ))
        )}
      </Grid>
    </Container>
  );
}
