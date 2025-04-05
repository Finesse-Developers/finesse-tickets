import { Box } from "@mui/material";

export default function Settings() {
  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        mt: "calc(100px + var(--template-frame-height, 0px))",
        overflow: "auto",
      }}
    ></Box>
  );
}
