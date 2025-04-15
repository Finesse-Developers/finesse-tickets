import { TextField } from "@mui/material";
import { memo } from "react";

type CustomNumberTextField2PropType = {
  value: number | "";
  stateAction: (value: React.SetStateAction<number | "">) => void;
  id: string;
  label: string;
};

function CustomNumberTextField2({
  id,
  stateAction,
  value,
  label,
}: CustomNumberTextField2PropType) {
  return (
    <TextField
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        stateAction(val === "" && val.length === 0 ? "" : Number(val));
      }}
      id={id}
      label={label}
      type="number"
      variant="filled" // Changed to filled to remove the outline
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      sx={{
        width: "120px",
        color: "white",
        "& .MuiFilledInput-root": {
          backgroundColor: "transparent", // No background color (box effect)
          border: "1px solid white", // Add border to make it appear as a box
          borderRadius: "4px", // Optional: adjust border radius to make it look like a box
        },
        "& .MuiFilledInput-input": {
          color: "white", // Input text color
        },
        "& .MuiInputLabel-root": {
          color: "white", // Label color
        },
        "& .MuiInputBase-root:hover": {
          borderColor: "white", // Border color on hover
        },
        "&.Mui-focused .MuiFilledInput-root": {
          borderColor: "white", // Border color when focused
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white", // <-- Fixes the blue label on focus
        },
      }}
    />
  );
}

export default memo(CustomNumberTextField2);
