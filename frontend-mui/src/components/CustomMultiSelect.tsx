import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { memo } from "react";

type MultiSelectItem = {
  name: string;
  value: string;
  disabled?: boolean;
};

type CustomMultiSelectProps = {
  values: any[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  items: MultiSelectItem[];
  id: string;
  placeholder?: string;
};

function CustomMultiSelect({
  values,
  handleChange,
  items,
  id,
  placeholder = "Select multiple items",
}: CustomMultiSelectProps) {
  return (
    <Select
      id={id}
      multiple
      value={values}
      onChange={handleChange}
      input={<OutlinedInput />}
      displayEmpty
      renderValue={(selected) => {
        if (selected.length === 0) return placeholder;

        // Determine if values are objects or strings
        const selectedNames = (selected as any[])
          .map((val) => {
            if (typeof val === "string") {
              return items.find((item) => item.value === val)?.name;
            } else if (val && typeof val === "object" && "name" in val) {
              return val.name;
            }
            return null;
          })
          .filter(Boolean);

        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              maxWidth: "100%",
            }}
          >
            {selectedNames.map((name, idx) => (
              <Typography
                key={idx}
                sx={{
                  backgroundColor: "#333",
                  padding: "2px 6px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </Typography>
            ))}
          </Box>
        );
      }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 300,
            overflowY: "auto",
            width: "auto",
          },
        },
        MenuListProps: {
          sx: {
            "& .MuiMenuItem-root": {
              "&:hover": {
                backgroundColor: "#444",
                color: "white",
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
      {items.map((item, i) => {
        const isChecked = values.some((val) =>
          typeof val === "string" ? val === item.value : val.id === item.value
        );

        return (
          <MenuItem key={i} value={item.value} disabled={item.disabled}>
            <Checkbox checked={isChecked} />
            <ListItemText primary={item.name} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default memo(CustomMultiSelect);
