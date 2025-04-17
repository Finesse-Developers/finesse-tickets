import {
  Box,
  CircularProgress,
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
import CustomDefaultEmojiSelect from "../../../components/CustomDefaultEmojiSelect";
import { EmojiType } from "../../../types/discordServer.types";
import CustomServerEmojiSelect from "../../../components/CustomServerEmojiSelect";
import CustomSwitch from "../../../components/CustomSwitch";
import DividerWithTitle from "../../../components/DividerWithTitle";
import { PlainButton } from "../../../components/PlainButton";
import { useParams } from "react-router-dom";
import { useNotification } from "../../../context/notification/NotificationContext";

const styles = { marginLeft: 2.5, marginBottom: 1.5, marginTop: 0.5 };
const parentStyle = {
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
};

export default function CreatePanel() {
  const { id } = useParams();
  const { notify } = useNotification();
  const { roles, categories, channels, emojis, discordServer } =
    useDiscordServer();
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
    "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER"
  >("PRIMARY");
  const [buttonText, setButtonText] = useState("");
  const [isCustomButton, setIsCustomButton] = useState(false);
  const [buttonEmoji, setButtonEmoji] = useState("");
  const [customButtonEmoji, setCustomButtonEmoji] = useState<EmojiType | null>(
    null
  );
  const [largeImageUrl, setLargeImageUrl] = useState("");
  const [smallImageUrl, setSmallImageUrl] = useState("");
  const [welcomeColor, setWelcomeColor] = useState("#FFFFFF");
  const [welcomeTitle, setWelcomeTitle] = useState("");
  const [welcomeTitleUrl, setWelcomeTitleUrl] = useState("");
  const [welcomeContent, setWelcomeContent] = useState("");
  const [welcomeLargeImageUrl, setWelcomeLargeImageUrl] = useState("");
  const [welcomeSmallImageUrl, setWelcomeSmallImageUrl] = useState("");
  const [footerText, setFooterText] = useState("");
  const [footerIconUrl, setFooterIconUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async () => {
    try {
      setIsSaving(true);

      const hasMissingInputs =
        [discordServer?.serverId, panelChannel, title, welcomeTitle].some(
          (val) => val === "" || val === undefined || val === null
        ) ||
        (welcomeTitle === "" && welcomeTitleUrl !== "") ||
        (footerText === "" && footerIconUrl !== "");

      if (hasMissingInputs) {
        notify("There are missing inputs.", "warning");
        return;
      }

      const payload = {
        serverId: discordServer?.serverId || "",
        mentionOnOpenRoleIds: mentionOnOpen,
        ticketCategoryId,
        panelTitle: title,
        content,
        panelColor,
        channelId: panelChannel?.channelId || "",
        channelName: panelChannel?.channelName || "",
        buttonColor,
        buttonEmoji: isCustomButton
          ? `<:${customButtonEmoji?.name || ""}:${customButtonEmoji?.id || ""}>`
          : buttonEmoji,
        buttonText,
        panelLargeImageUrl: largeImageUrl,
        panelSmallImageUrl: smallImageUrl,
        welcomeEmbedColor: welcomeColor,
        welcomeTitle,
        welcomeTitleUrl,
        welcomeContent,
        welcomeLargeImageUrl,
        welcomeSmallImageUrl,
        welcomeFooterText: footerText,
        welcomeFooterIconUrl: footerIconUrl,
      };

      console.log(payload);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/panel/create/${id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create panel for the server.");
      }

      const data = await res.json();
      // console.log(data);
      if (data) window.location.reload();
    } catch (error) {
      notify("Failed to create panel for the server.", "warning");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleEmojiSelectChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const parsed = JSON.parse(event.target.value) as EmojiType;
      setCustomButtonEmoji(parsed);
    },
    []
  );

  const handleSwitchChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      setter: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      setter(event.target.checked);
    },
    []
  );

  return (
    <Box sx={parentStyle}>
      <Typography
        variant="h3"
        sx={{ color: "white" }}
        margin={1.5}
        marginTop={0.5}
      >
        Create Panel
      </Typography>

      <FormControl sx={{ ...styles, width: "300px" }}>
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

      <FormControl sx={{ ...styles, width: "400px" }}>
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
          placeholder="Select which category will tickets be created"
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
      <FormControl sx={{ ...styles }}>
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

      <FormControl sx={{ ...styles, width: "400px" }}>
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
      <FormControl sx={{ ...styles }}>
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

      <FormControl sx={{ ...styles, width: "400px" }}>
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
          Ticket channel
        </FormLabel>

        <CustomSelect
          id="pannelChannel"
          value={panelChannel?.channelId || ""}
          placeholder="Please select where ticket panel will be sent"
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
      <FormControl sx={{ ...styles, width: "130px" }}>
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
              e.target.value as "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER"
            )
          }
          items={[
            { name: "Blue", value: "PRIMARY", disabled: false },
            { name: "Grey", value: "SECONDARY", disabled: false },
            { name: "Green", value: "SUCCESS", disabled: false },
            { name: "Red", value: "DANGER", disabled: false },
          ]}
        />
      </FormControl>

      <FormControl sx={{ ...styles }}>
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

      <FormControl sx={{ ...styles }}>
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

        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography>Custom emoji</Typography>
            <CustomSwitch
              checked={isCustomButton}
              handleSwitchChange={handleSwitchChange}
              label=""
              stateAction={setIsCustomButton}
            />
          </Box>

          {isCustomButton ? (
            <CustomServerEmojiSelect
              id="buttonEmoji"
              value={customButtonEmoji}
              items={emojis}
              handleSelectChange={handleEmojiSelectChange}
            />
          ) : (
            <CustomDefaultEmojiSelect
              value={buttonEmoji}
              setValue={setButtonEmoji}
            />
          )}
        </Box>
      </FormControl>
      <br />
      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="largeImageUrl"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Large image url
        </FormLabel>

        <CustomTextField
          id="largeImageUrl"
          value={largeImageUrl}
          placeholder="https://example/image.png"
          handleTextFieldChange={(e) => setLargeImageUrl(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="smallImageUrl"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Small image url
        </FormLabel>

        <CustomTextField
          id="smallImageUrl"
          value={smallImageUrl}
          placeholder="https://example/image.png"
          handleTextFieldChange={(e) => setSmallImageUrl(e.target.value)}
        />
      </FormControl>

      <DividerWithTitle title="Welcome Message" variant="h5" />

      <FormControl sx={{ ...styles }}>
        <FormLabel
          htmlFor="welcomeMessageEmbedColor"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Embed color
        </FormLabel>

        <CustomColorPicker
          value={welcomeColor}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setWelcomeColor(event.target.value)
          }
        />
      </FormControl>

      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="welcomeTitle"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Title
        </FormLabel>

        <CustomTextField
          id="welcomeTitle"
          value={welcomeTitle}
          placeholder="Embed Title"
          handleTextFieldChange={(e) => setWelcomeTitle(e.target.value)}
        />
      </FormControl>

      <br />

      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="welcomeContent"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Welcome message content
        </FormLabel>

        <CustomTextArea
          value={welcomeContent}
          id="welcomeContent"
          placeholder="Welcome content here..."
          handleTextFieldChange={(e) => setWelcomeContent(e.target.value)}
          rows={4}
        />
      </FormControl>

      <FormControl sx={{ ...styles, width: "300px" }}>
        <FormLabel
          htmlFor="welcomeTitleUrl"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Title url
        </FormLabel>

        <CustomTextField
          id="welcomeTitleUrl"
          value={welcomeTitleUrl}
          placeholder="https://example.com"
          handleTextFieldChange={(e) => setWelcomeTitleUrl(e.target.value)}
        />
      </FormControl>

      <br />
      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="welcomeLargeImageUrl"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Large image url
        </FormLabel>

        <CustomTextField
          id="welcomeLargeImageUrl"
          value={welcomeLargeImageUrl}
          placeholder="https://example.com/image.png"
          handleTextFieldChange={(e) => setWelcomeLargeImageUrl(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="welcomeSmallImageUrl"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Large image url
        </FormLabel>

        <CustomTextField
          id="welcomeSmallImageUrl"
          value={welcomeSmallImageUrl}
          placeholder="https://example.com/image.png"
          handleTextFieldChange={(e) => setWelcomeSmallImageUrl(e.target.value)}
        />
      </FormControl>
      <br />
      <FormControl sx={{ ...styles, width: "250px" }}>
        <FormLabel
          htmlFor="footerText"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Footer text
        </FormLabel>

        <CustomTextField
          id="footerText"
          value={footerText}
          placeholder="Footer Text"
          handleTextFieldChange={(e) => setFooterText(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="footerIconUrl"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Footer icon url
        </FormLabel>

        <CustomTextField
          id="footerIconUrl"
          value={footerIconUrl}
          placeholder="https://example.com/image.png"
          handleTextFieldChange={(e) => setFooterIconUrl(e.target.value)}
        />
      </FormControl>
      <br />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 3,
        }}
      >
        <PlainButton
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          disabled={isSaving}
          onClick={handleCreate}
        >
          {isSaving ? <CircularProgress color="inherit" size={24} /> : "CREATE"}
        </PlainButton>
      </Box>
    </Box>
  );
}
