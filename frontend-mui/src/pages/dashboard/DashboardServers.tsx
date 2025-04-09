import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PlainButton } from "../../components/PlainButton";
import { redirectToHomeIfNotAuth } from "../../guards/Auth.ProtectedRoutes";
import DashboardCard from "../../components/DashboardCard";

export type AdminServerType = {
  id: string;
  icon: string | null;
  name: string;
};

export default function DashboardServers() {
  const { user, loading } = useAuth();
  const hasFetchedRef = useRef(false);
  const [adminServers, setAdminServers] = useState<AdminServerType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardMessage, setDashboardMessage] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (hasFetchedRef.current) return; // Prevent double fetching
    hasFetchedRef.current = true;

    const fetchAdminServers = async () => {
      setIsLoading(true);
      setDashboardMessage(null);
      try {
        const res = await fetch(`http://localhost:6969/dashboard`, {
          credentials: "include",
        });

        redirectToHomeIfNotAuth(res, nav);

        const data = await res.json();
        if ((data as AdminServerType[]).length <= 0)
          setDashboardMessage(
            "No servers found, please invite the bot on your discord server."
          );
        setAdminServers(data);
      } catch (error) {
        console.log(error);
        setDashboardMessage(
          "Something went wrong fetching discord servers, please try again or contact support in our discord server."
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (!loading) {
      if (user) {
        fetchAdminServers();
      } else {
        nav("/"); // Redirect to home if user is not logged in
      }
    }
  }, [user, nav, loading]);

  if (isLoading || loading)
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
        {dashboardMessage ? (
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
              {dashboardMessage}
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
