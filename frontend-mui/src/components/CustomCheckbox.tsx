import { FormControlLabel, Checkbox } from "@mui/material";

type CustomCheckboxPropType = {
  checked: boolean;
  stateAction: (value: React.SetStateAction<boolean>) => void;
  label: string;
};

export default function CustomCheckbox({
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
