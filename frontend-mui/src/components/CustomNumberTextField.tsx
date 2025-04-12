import { TextField } from "@mui/material";
import { memo } from "react";

type CustomNumberTextFieldPropType = {
  id: string;
  label: string;
  value: number | "";
  handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CustomNumberTextField({
  id,
  label,
  value,
  handleTextFieldChange,
}: CustomNumberTextFieldPropType) {
  return (
    <TextField
      id={id}
      label={label}
      type="number"
      variant="outlined"
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      value={value}
      onChange={handleTextFieldChange}
      sx={{
        color: "white",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // Outline color
          },
          "&:hover fieldset": {
            borderColor: "white", // Hover outline color
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Focused outline color
          },
          "& input": {
            color: "white", // Text color inside the input
          },
        },
        "& .MuiInputLabel-root": {
          color: "white", // Label color when not focused
        },
      }}
    />
  );
}

export default memo(CustomNumberTextField);
