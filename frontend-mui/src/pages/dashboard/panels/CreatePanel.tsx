import {
  Box,
  FormControl,
  FormLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDiscordServer } from "../../../context/DiscordServerContext";
import CustomMultiSelect from "../../../components/CustomMultiSelect";
import CustomSelect from "../../../components/CustomSelect";
import CustomTextField from "../../../components/CustomTextField";
import CustomTextArea from "../../../components/CustomTextArea";
import CustomColorPicker from "../../../components/CustomColorPicker";
import CustomEmojiSelect from "../../../components/CustomEmojiSelect";

export default function CreatePanel() {
  const { roles, categories, channels } = useDiscordServer();
  const [mentionOnOpen, setMentionOnOpen] = useState<string[]>([]);
  const [ticketCategoryId, setTicketCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [panelColor, setPanelColor] = useState("#FFFFFF");
  const [panelChannel, setPanelChannel] = useState<{
    channelId: string;
    channelName: string;
  } | null>(null);
  const [buttonColor, setButtonColor] = useState<
    "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER" | "LINK"
  >("PRIMARY");
  const [buttonText, setButtonText] = useState("");
  const [buttonEmoji, setButtonEmoji] = useState("");

  const handlePanelChannelChange = useCallback((event: SelectChangeEvent) => {
    const selectedChannelId = event.target.value;
    const selectedChannel = channels.find(
      (channel) => channel.value === selectedChannelId
    );

    if (selectedChannel) {
      setPanelChannel({
        channelId: selectedChannel.value,
        channelName: selectedChannel.name,
      });
    }
  }, []);

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
        overflowY: "auto",
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
      <br />
      <FormControl sx={{ margin: 1.5 }}>
        <FormLabel
          htmlFor="title"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Panel title
        </FormLabel>

        <CustomTextField
          id="title"
          value={title}
          placeholder="Panel title"
          handleTextFieldChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ margin: 1.5, width: "400px" }}>
        <FormLabel
          htmlFor="content"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Panel content
        </FormLabel>

        <CustomTextArea
          value={content}
          id="content"
          placeholder="Panel content here..."
          handleTextFieldChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </FormControl>
      <br />
      <FormControl sx={{ margin: 1.5 }}>
        <FormLabel
          htmlFor="panelColor"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Panel color
        </FormLabel>

        <CustomColorPicker
          value={panelColor}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPanelColor(event.target.value)
          }
        />
      </FormControl>

      <FormControl sx={{ margin: 1.5, width: "400px" }}>
        <FormLabel
          htmlFor="pannelChannel"
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
          id="pannelChannel"
          value={panelChannel?.channelId || ""}
          handleSelectChange={handlePanelChannelChange}
          items={channels
            .filter((c) => c.value !== "none")
            .map((c) => ({
              name: c.name,
              value: c.value,
              disabled: false,
            }))}
        />
      </FormControl>
      <br />
      <FormControl sx={{ margin: 1.5, width: "400px" }}>
        <FormLabel
          htmlFor="buttonColor"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Button color
        </FormLabel>

        <CustomSelect
          id="buttonColor"
          value={buttonColor}
          handleSelectChange={(e) =>
            setButtonColor(
              e.target.value as
                | "PRIMARY"
                | "SECONDARY"
                | "SUCCESS"
                | "DANGER"
                | "LINK"
            )
          }
          items={[
            { name: "Primary", value: "PRIMARY", disabled: false },
            { name: "Secondary", value: "SECONDARY", disabled: false },
            { name: "Success", value: "SUCCESS", disabled: false },
            { name: "Danger", value: "DANGER", disabled: false },
            { name: "Link", value: "LINK", disabled: false },
          ]}
        />
      </FormControl>

      <FormControl sx={{ margin: 1.5 }}>
        <FormLabel
          htmlFor="buttonText"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Button text
        </FormLabel>

        <CustomTextField
          id="buttonText"
          value={buttonText}
          placeholder="Button Text"
          handleTextFieldChange={(e) => setButtonText(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ margin: 1.5 }}>
        <FormLabel
          htmlFor="buttonEmoji"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Button emoji
        </FormLabel>

        <CustomEmojiSelect value={buttonEmoji} setValue={setButtonEmoji} />
      </FormControl>
    </Box>
  );
}
