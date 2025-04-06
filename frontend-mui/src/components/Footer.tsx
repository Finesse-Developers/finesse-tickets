import { Avatar, Box, Container, Typography } from "@mui/material";
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
      component="footer"
      sx={{
        backgroundColor: "#2b343d",
        py: 2,
        mt: "auto", // Pushes footer to the bottom when content is short
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Link
          to={"https://discord.gg/dvUsZ9Gj2m"}
          style={LinkStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar
            src={Discord_icon}
            sx={{
              width: 30,
              height: 30,
              "& img": {
                filter: "invert(100%)",
              },
            }}
          />
          <Typography color="white">Join our Discord Server!</Typography>
        </Link>
        <Link
          to={"https://github.com/Finesse-Developers"}
          style={LinkStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub sx={{ color: "white" }} />
          <Typography color="white">Check out our GitHub!</Typography>
        </Link>
      </Container>
    </Box>
  );
}
