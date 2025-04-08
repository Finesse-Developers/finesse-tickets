// Sidebar.tsx
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import ViewListIcon from "@mui/icons-material/ViewList";
import GroupIcon from "@mui/icons-material/Group";
import { DiscordServerType } from "../pages/dashboard/Dashboard";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const hoverStyle = {
  color: "white",
  "& .MuiSvgIcon-root": { color: "white" },
  ":hover": {
    backgroundColor: "white",
    color: "black",
    "& .MuiSvgIcon-root": { color: "black" },
  },
  paddingLeft: 3.5,
};

const Sidebar = ({ discordServer }: { discordServer: DiscordServerType }) => {
  const links = useMemo(
    () => [
      { name: "Back to servers", link: "/dashboard", icon: <ArrowBackIcon /> },
      {
        name: "Settings",
        link: `/dashboard/${discordServer.serverId}`,
        icon: <SettingsIcon />,
      },
      {
        name: "Transcripts",
        link: `/dashboard/${discordServer.serverId}/transcripts`,
        icon: <DescriptionIcon />,
      },
      {
        name: "Ticket Panels",
        link: `/dashboard/${discordServer.serverId}/panel`,
        icon: <ViewListIcon />,
      },
      {
        name: "Staff Members",
        link: `/dashboard/${discordServer.serverId}/staffs`,
        icon: <GroupIcon />,
      },
    ],
    [discordServer.serverId]
  );

  return (
    <Box
      sx={{
        width: 260,
        boxSizing: "border-box",
        borderRadius: 2,
        border: "2px solid white",
        backgroundColor: "transparent",
        color: "white",
        alignSelf: "flex-start",
        marginLeft: 5,
        marginTop: 1.5,
      }}
    >
      {/* Server Info */}
      <Box
        display="flex"
        alignItems="center"
        gap={3}
        border="2px solid white"
        borderRadius={2}
        padding={1.5}
        margin={3}
        marginBottom={2}
      >
        {discordServer.icon ? (
          <Box
            component="img"
            src={discordServer.icon}
            alt={discordServer.name}
            sx={{
              borderRadius: 1,
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "gray",
            }}
          >
            <Typography variant="h4">
              {discordServer.name?.trim()?.charAt(0)?.toUpperCase() || "?"}
            </Typography>
          </Avatar>
        )}
        <Typography fontWeight={600} fontSize={12}>
          {discordServer.name.length > 21
            ? `${discordServer.name.slice(0, 21)}...`
            : discordServer.name}
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.link}
            style={{ textDecoration: "none" }}
          >
            <ListItemButton sx={hoverStyle}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
