import { FormControlLabel, Checkbox } from "@mui/material";
import { memo } from "react";

type CustomCheckboxPropType = {
  checked: boolean;
  stateAction: (value: React.SetStateAction<boolean>) => void;
  label: string;
};

function CustomCheckbox({
  checked,
  stateAction,
  label,
}: CustomCheckboxPropType) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => stateAction(e.target.checked)}
          sx={{
            color: "white",
            "&.Mui-checked": {
              color: "white",
            },
            "& .MuiSwitch-thumb": {
              backgroundColor: "#fff",
            },
          }}
        />
      }
      label={label}
    />
  );
}

export default memo(CustomCheckbox);
