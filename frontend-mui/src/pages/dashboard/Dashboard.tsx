import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PlainButton } from "../../components/PlainButton";

type AdminServerType = {
  id: string;
  icon: string | null;
  name: string;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [adminServers, setAdminServers] = useState<AdminServerType[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchAdminServers = async () => {
      try {
        const res = await fetch(`http://localhost:6969/auth/dashboard`, {
          credentials: "include",
        });
        const data = await res.json();
        setAdminServers(data);
      } catch (error) {
        console.log(error);
        document.location.href = "/";
      }
    };
    if (user) {
      fetchAdminServers();
    } else {
      nav("/");
    }
  }, [user]);

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        mt: "calc(100px + var(--template-frame-height, 0px))",
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
          alignSelf: "flex-end", // Align button to the right
        }}
      >
        <PlainButton>+ Add Server</PlainButton>
      </Link>
      <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {adminServers.map((server) => (
          <Card
            sx={{
              maxWidth: 150,
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
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
