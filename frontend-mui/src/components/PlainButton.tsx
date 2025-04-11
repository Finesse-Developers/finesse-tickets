import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const PlainButton = styled(Button)(() => ({
  backgroundColor: "white", // White background
  color: "black", // Black text color
  padding: "6px 12px", // Padding around the text
  textTransform: "none", // No uppercase
  fontWeight: "500", // Medium weight font
  borderRadius: "8px", // Rounded corners
  border: "2px solid white", // Black border for the button
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0)", // Lighter white for hover
    color: "white",
  },
  "&:focus": {
    outline: "none", // No outline on focus
  },
  ":disabled": {
    backgroundColor: "rgba(255, 255, 255, 0)", // Lighter white for hover
    color: "white",
  },
}));
