import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(to bottom,rgb(43, 52, 61),rgb(28, 30, 65))", // Dark to dark blue gradient
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Container>
          <Outlet /> {/* This is where the nested routes will be rendered */}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
