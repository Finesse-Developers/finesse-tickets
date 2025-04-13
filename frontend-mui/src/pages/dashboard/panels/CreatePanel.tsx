import { Box, FormControl, FormLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useDiscordServer } from "../../../context/DiscordServerContext";
import CustomMultiSelect from "../../../components/CustomMultiSelect";

export default function CreatePanel() {
  const { roles } = useDiscordServer();
  const [mentionOnOpen, setMentionOnOpen] = useState<string[]>([]);

  return (
    <Box
      sx={{
        width: "75%",
        height: "95%",
        boxSizing: "border-box",
        borderRadius: 2,
        border: "2px solid white",
        backgroundColor: "transparent",
        color: "white",
        alignSelf: "flex-start",
        marginLeft: 5,
        marginTop: 1.5,
        padding: 0,
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "white" }}
        margin={1.5}
        marginTop={0.5}
      >
        Create Panel
      </Typography>

      <FormControl sx={{ margin: 1.5, width: "300px" }}>
        <FormLabel
          htmlFor="mentionOnOpen"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Mention on open
        </FormLabel>

        <CustomMultiSelect
          id="mentionOnOpen"
          values={mentionOnOpen}
          handleChange={(e) => setMentionOnOpen(e.target.value as string[])}
          items={roles.map((r) => ({
            name: r.name,
            value: r.id,
            disabled: false,
          }))}
        />
      </FormControl>
    </Box>
  );
}
