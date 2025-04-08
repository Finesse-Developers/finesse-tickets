import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

type CustomSelectPropType = {
  value: string;
  handleSelectChange: (event: SelectChangeEvent) => void;
  items: { name: string; value: string; disabled: boolean }[];
  id: string;
};

export default function CustomSelect({
  value,
  handleSelectChange,
  items,
  id,
}: CustomSelectPropType) {
  return (
    <Select
      id={id}
      value={value}
      onChange={handleSelectChange}
      displayEmpty
      sx={{
        color: "white",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        ".MuiSvgIcon-root": {
          color: "white",
        },
      }}
    >
      {items.map((item, i) => (
        <MenuItem key={i} value={item.value} disabled={item.disabled}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
}
