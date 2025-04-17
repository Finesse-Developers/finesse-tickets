import { memo } from "react";
import { NotificationManagerProps } from "../../types/discordServer.types";
import { Alert, Box, Slide } from "@mui/material";

function NotificationManager({
  notifications,
  onClose,
}: NotificationManagerProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1300, // above everything, like MUI modals
      }}
    >
      {notifications.map((note) => (
        <Slide key={note.id} direction="down" in mountOnEnter unmountOnExit>
          <Alert
            onClose={() => onClose(note.id)}
            severity={note.severity || "info"}
            sx={{
              minWidth: 300,
              boxShadow: 3,
            }}
          >
            {note.message}
          </Alert>
        </Slide>
      ))}
    </Box>
  );
}

export default memo(NotificationManager);
