import React, { memo, useState, useCallback } from "react";
import { Box, IconButton, InputBase, Popover } from "@mui/material";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

type PropType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const CustomEmojiSelect = ({ value, setValue }: PropType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setValue(emojiData.emoji);
  }, []);

  const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        borderRadius: "4px",
        border: "1px solid white",
        display: "flex",
        alignItems: "center",
        paddingX: 1,
        paddingY: 0.5,
      }}
    >
      <InputBase
        placeholder="Select an emoji..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          color: "#fff",
          flex: 1,
          fontSize: 16,
          px: 1,
          cursor: "pointer",
        }}
        readOnly
      />
      <IconButton onClick={handleOpenPicker} sx={{ color: "#fff" }}>
        <InsertEmoticonIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        disableRestoreFocus
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          theme={Theme.DARK}
          lazyLoadEmojis
        />
      </Popover>
    </Box>
  );
};

export default memo(CustomEmojiSelect);
