import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const PlainButton = styled(Button)(({ size }) => ({
  backgroundColor: "white",
  color: "black",
  padding: size === "small" ? "4px 8px" : "6px 12px",
  fontSize: size === "small" ? "0.75rem" : "1rem",
  textTransform: "none",
  fontWeight: "500",
  borderRadius: "8px",
  border: "2px solid white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "white",
  },
  "&:focus": {
    outline: "none",
  },
  ":disabled": {
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "white",
  },
}));
