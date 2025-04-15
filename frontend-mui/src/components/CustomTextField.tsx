import { TextField } from "@mui/material";
import { memo } from "react";

type PropType = {
  id: string;
  value: string;
  placeholder: string;
  handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CustomTextField({
  id,
  value,
  handleTextFieldChange,
  placeholder,
}: PropType) {
  return (
    <TextField
      id={id}
      type="text"
      variant="outlined"
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      placeholder={placeholder}
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
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white", // <-- Fixes the blue label on focus
        },
      }}
    />
  );
}

export default memo(CustomTextField);
