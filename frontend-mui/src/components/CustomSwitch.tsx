import { FormControlLabel, Switch, Typography } from "@mui/material";

type CustomSwitchPropType = {
  checked: boolean;
  handleSwitchChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  label: string;
  stateAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomSwitch({
  checked,
  handleSwitchChange,
  label,
  stateAction,
}: CustomSwitchPropType) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => handleSwitchChange(e, stateAction)}
          sx={{
            color: "white", // Default color
            "&.Mui-checked": {
              color: "white", // Color of the thumb when checked
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#fff", // Track color when not checked
            },
            "& .MuiSwitch-thumb": {
              backgroundColor: "#fff", // Thumb color when checked
            },
            "&.Mui-checked .MuiSwitch-thumb": {
              backgroundColor: "#fff", // Thumb color when checked
            },
          }}
        />
      }
      label={
        <Typography
          sx={{
            color: "white", // Default color
          }}
        >
          {label}
        </Typography>
      }
    />
  );
}
