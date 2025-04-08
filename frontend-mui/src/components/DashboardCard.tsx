import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AdminServerType } from "../pages/dashboard/DashboardServers";
import { memo } from "react";

function DashboardCard({ server }: { server: AdminServerType }) {
  return (
    <Box
      sx={{
        width: 150,
        backgroundColor: "transparent",
        padding: "10px",
        cursor: "pointer",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: 1,
        ":hover": {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderColor: "white",
        },
        ":active": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Link to={`/dashboard/${server.id}`} style={{ textDecoration: "none" }}>
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
    </Box>
  );
}

export default memo(DashboardCard);
