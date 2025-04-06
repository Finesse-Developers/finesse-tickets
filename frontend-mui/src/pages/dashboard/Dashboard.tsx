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

type AdminServerType = {
  id: string;
  icon: string | null;
  name: string;
};

export default function Dashboard() {
  const { user } = useAuth();
  const hasFetchedRef = useRef(false);
  const [adminServers, setAdminServers] = useState<AdminServerType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    if (user) {
      fetchAdminServers();
    } else {
      nav("/");
    }
  }, [user, nav]);

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
      {isLoading ? (
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
      ) : (
        <>
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
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
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
                <Card
                  sx={{
                    width: 150,
                    backgroundColor: "transparent",
                    padding: "10px",
                    cursor: "pointer",
                    ":hover": {
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  elevation={0}
                  key={server.id}
                >
                  <Link
                    to={`/dashboard/${server.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {server.icon ? (
                      <Box
                        component="img"
                        src={server.icon}
                        alt={server.name}
                        sx={{
                          borderRadius: "20px",
                          width: "100px",
                          height: "100px",
                          margin: "0 auto",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          backgroundColor: "gray",
                          margin: "0 auto",
                        }}
                      >
                        <Typography variant="h4">
                          {server.name.charAt(0).toUpperCase()}
                        </Typography>
                      </Avatar>
                    )}
                    <Typography
                      variant="h6"
                      sx={{ marginTop: 1, fontSize: "14px", color: "white" }}
                    >
                      {server.name}
                    </Typography>
                  </Link>
                </Card>
              ))
            )}
          </Grid>
        </>
      )}
    </Container>
  );
}
