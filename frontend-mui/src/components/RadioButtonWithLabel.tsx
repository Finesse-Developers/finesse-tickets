import { FormControlLabel, Radio, Typography } from "@mui/material";

export default function RadioButtonWithLabel({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          sx={{
            color: "white",
            "&.Mui-checked": {
              color: "white",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
      }
      label={<Typography sx={{ color: "white" }}>{label}</Typography>}
    />
  );
}
