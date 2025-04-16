import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { EmojiType } from "../types/discordServer.types";

type CustomSelectPropType = {
  value: EmojiType | null;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  items: EmojiType[];
  id: string;
};

function CustomServerEmojiSelect({
  value,
  handleSelectChange,
  items,
  id,
}: CustomSelectPropType) {
  return (
    <Select
      id={id}
      value={value ? JSON.stringify(value) : ""}
      onChange={handleSelectChange}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) return "Select an emoji";
        const emoji = JSON.parse(selected) as EmojiType;
        return (
          <Box display="flex" alignItems="center">
            <img
              src={emoji.url}
              alt={emoji.name}
              width={20}
              height={20}
              style={{ marginRight: 8 }}
            />
            <Typography color="white">{emoji.name}</Typography>
          </Box>
        );
      }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 300,
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
        width: "300px",
      }}
    >
      <MenuItem value="" disabled>
        Select an emoji
      </MenuItem>
      {items.map((emoji) => (
        <MenuItem key={emoji.id} value={JSON.stringify(emoji)}>
          <Box display="flex" alignItems="center">
            <img
              src={emoji.url}
              alt={emoji.name}
              width={20}
              height={20}
              style={{ marginRight: 8 }}
            />
            {emoji.name}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}

export default memo(CustomServerEmojiSelect);
