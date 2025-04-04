import { Avatar, Box, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import Discord_icon from "/dc-icon.svg";
import { Link } from "react-router-dom";

const LinkStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  textDecoration: "none",
};

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#2b343d",
        ...LinkStyle,
        gap: 20,
        padding: 1,
      }}
    >
      <Link
        to={"https://discord.gg/dvUsZ9Gj2m"}
        style={{
          ...LinkStyle,
        }}
      >
        <Avatar
          src={Discord_icon}
          sx={{
            "& img": {
              filter: "invert(100%)", // Inverts the image color to white
            },
            width: "30px",
            height: "30px",
          }}
        />
        <Typography color="white">Join our Discord Server!</Typography>
      </Link>
      <Link
        to={"https://github.com/Finesse-Developers"}
        style={{
          ...LinkStyle,
        }}
      >
        <GitHub sx={{ color: "white" }} />
        <Typography color="white">Check out our GitHub!</Typography>
      </Link>
    </Box>
  );
}
