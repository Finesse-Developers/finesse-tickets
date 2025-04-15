import { TextField, InputAdornment, Box } from "@mui/material";
import { memo } from "react";

type ColorPickerProps = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CustomColorPicker({ value, handleChange }: ColorPickerProps) {
  return (
    <TextField
      type="text"
      value={value}
      onChange={handleChange}
      slotProps={{
        htmlInput: { readOnly: true },
        input: {
          sx: {
            color: "white",
            cursor: "default",
          },
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="input"
                type="color"
                value={value}
                onChange={handleChange}
                sx={{
                  width: 32,
                  height: 32,
                  padding: 0,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiInputLabel-root": { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
        },
        "& .MuiInputAdornment-root": {
          pr: 1,
        },
      }}
    />
  );
}

export default memo(CustomColorPicker);
