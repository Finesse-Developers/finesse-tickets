import {
  Box,
  FormControl,
  FormLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDiscordServer } from "../../../context/DiscordServerContext";
import CustomMultiSelect from "../../../components/CustomMultiSelect";
import CustomSelect from "../../../components/CustomSelect";

export default function CreatePanel() {
  const { roles, categories } = useDiscordServer();
  const [mentionOnOpen, setMentionOnOpen] = useState<string[]>([]);
  const [ticketCategoryId, setTicketCategoryId] = useState("");

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

      <FormControl sx={{ margin: 1.5, width: "400px" }}>
        <FormLabel
          htmlFor="ticketCategoryId"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Ticket category
        </FormLabel>

        <CustomSelect
          id="ticketCategoryId"
          value={ticketCategoryId}
          handleSelectChange={(event: SelectChangeEvent) =>
            setTicketCategoryId(event.target.value as string)
          }
          items={categories.map((c) => ({
            name: c.name,
            value: c.id,
            disabled: false,
          }))}
        />
      </FormControl>
    </Box>
  );
}
