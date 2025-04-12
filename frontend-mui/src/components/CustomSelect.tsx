import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo } from "react";

type CustomSelectPropType = {
  value: string;
  handleSelectChange: (event: SelectChangeEvent) => void;
  items: { name: string; value: string; disabled: boolean }[];
  id: string;
};

function CustomSelect({
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
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200,
            overflowY: "auto",
          },
        },
        MenuListProps: {
          sx: {
            "& .MuiMenuItem-root": {
              "&:hover": {
                backgroundColor: "#444", // dark hover background
                color: "white", // keep text white on hover
              },
              "&.Mui-selected": {
                backgroundColor: "#555",
                color: "white",
                "&:hover": {
                  backgroundColor: "#666",
                },
              },
            },
          },
        },
      }}
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
      <MenuItem value="" disabled>
        Please select transcript channel
      </MenuItem>
      {items.map((item, i) => (
        <MenuItem key={i} value={item.value} disabled={item.disabled}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default memo(CustomSelect);
