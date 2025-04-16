import { Box, Divider, Typography } from "@mui/material";
import { memo } from "react";

interface SectionHeaderWithDividerProps {
  title: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: string;
}

const DividerWithTitle = ({
  title,
  color = "white",
  variant = "h4",
}: SectionHeaderWithDividerProps) => {
  return (
    <Box display="flex" alignItems="center" m={2}>
      <Divider sx={{ flexGrow: 1, borderColor: color }} />
      <Typography variant={variant} sx={{ color, whiteSpace: "nowrap", mx: 2 }}>
        {title}
      </Typography>
      <Divider sx={{ flexGrow: 50, borderColor: color }} />
    </Box>
  );
};

export default memo(DividerWithTitle);
