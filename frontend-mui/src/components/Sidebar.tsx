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
import { DiscordServerType } from "../pages/dashboard/Settings";

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
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          borderRadius: 2,
          border: "2px solid white",
          backgroundColor: "transparent",
          color: "white",
          height: "auto",
        },
      }}
    >
      {/* Server Info */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
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
              {discordServer.name.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
        )}
        <Typography fontWeight={600} fontSize="1.1rem">
          {discordServer.name}
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        <ListItemButton sx={hoverStyle}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Back to servers" />
        </ListItemButton>

        <ListItemButton sx={hoverStyle}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton sx={hoverStyle}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Transcripts" />
        </ListItemButton>

        <ListItemButton sx={hoverStyle}>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Ticket Panels" />
        </ListItemButton>

        <ListItemButton sx={{ ...hoverStyle, marginBottom: 2 }}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Staff Members" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
