import { TextField } from "@mui/material";
import { memo } from "react";

type PropType = {
  id: string;
  value: string;
  placeholder: string;
  handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
};

function CustomTextarea({
  id,
  value,
  handleTextFieldChange,
  placeholder,
  rows = 4, // default row count
}: PropType) {
  return (
    <TextField
      id={id}
      multiline
      rows={rows}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleTextFieldChange}
      sx={{
        color: "white",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& textarea": {
            color: "white", // Text color inside the textarea
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white",
        },
      }}
    />
  );
}

export default memo(CustomTextarea);
