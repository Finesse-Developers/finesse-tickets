import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import fns_logo from "/fns_logo.png";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PlainButton } from "./PlainButton";
import { useState, MouseEvent } from "react";
import { useAuth } from "../context/AuthContext";

// Styled toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid rgba(255, 255, 255, 0.37)",
  backgroundColor: "transparent",
  boxShadow: "0 0px 10px rgba(130, 130, 130, 0.51)",
  padding: "16px 24px",
}));

export default function Navbar() {
  const { user, login, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Avatar src={fns_logo} alt="fns_logo" sx={{ mr: 2 }} />
            </Link>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Finesse Tickets
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {!user ? (
              <Link
                to={`http://localhost:6969/auth`}
                style={{ textDecoration: "none" }}
              >
                <PlainButton variant="contained" size="small">
                  Login
                </PlainButton>
              </Link>
            ) : (
              <>
                {/* Avatar that opens the menu on click */}
                <Avatar
                  src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
                  onClick={handleMenuOpen}
                  sx={{ cursor: "pointer" }}
                />
                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#1c1f2c", // Dark blue theme, almost black
                      color: "white", // White text
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)", // Subtle shadow
                      marginTop: 2,
                    },
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {/* Dashboard Menu Item */}
                  <MenuItem
                    onClick={handleMenuClose}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#161b26", // Darken the background color when hovered
                      },
                    }}
                  >
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography>Dashboard</Typography>
                    </Link>
                  </MenuItem>

                  {/* Logout Menu Item */}
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#161b26", // Darken the background color when hovered
                      },
                    }}
                  >
                    <Typography
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
