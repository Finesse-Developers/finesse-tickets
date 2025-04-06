import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(to bottom,rgb(43, 52, 61),rgb(28, 30, 65))", // Dark to dark blue gradient
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        // border: "1px solid blue",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          height: "80%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          // border: "1px solid red",
          padding: 0,
          margin: 0,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            // border: "1px solid violet",
            margin: 0,
          }}
        >
          <Outlet /> {/* This is where the nested routes will be rendered */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
