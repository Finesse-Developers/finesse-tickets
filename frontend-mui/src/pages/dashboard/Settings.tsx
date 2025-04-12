import {
  Box,
  CircularProgress,
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import RadioButtonWithLabel from "../../components/RadioButtonWithLabel";
import CustomSelect from "../../components/CustomSelect";
import CustomNumberTextField from "../../components/CustomNumberTextField";
import CustomSwitch from "../../components/CustomSwitch";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomNumberTextField2 from "../../components/CustomNumberTextField2";
import { PlainButton } from "../../components/PlainButton";
import { useParams } from "react-router-dom";
import { useDiscordServer } from "../../context/DiscordServerContext";
import { convertToDaysHoursMins } from "../../utils/helper";

export default function Settings() {
  const { id } = useParams();
  const { discordServer, channels } = useDiscordServer();
  const [ticketNameStyle, setTicketNameStyle] = useState<string>("number");
  const [ticketTranscriptChannelId, setTicketTranscriptChannelId] =
    useState<string>("none");
  const [maxTicketPerUser, setMaxTicketPerUser] = useState<number | "">("");
  const [attachFiles, setAttachFiles] = useState<boolean>(false);
  const [embedLinks, setEmbedLinks] = useState<boolean>(false);
  const [addReactions, setAddReactions] = useState<boolean>(false);
  const [autoCloseEnabled, setAutoCloseEnabled] = useState<boolean>(false);
  const [closeWhenUserLeaves, setCloseWhenUserLeaves] =
    useState<boolean>(false);
  const [openNoResponseDays, setOpenNoResponseDays] = useState<number | "">("");
  const [openNoResponseHours, setOpenNoResponseHours] = useState<number | "">(
    ""
  );
  const [openNoResponseMinutes, setOpenNoResponseMinutes] = useState<
    number | ""
  >("");
  const [sinceLastMessageDays, setSinceLastMessageDays] = useState<number | "">(
    ""
  );
  const [sinceLastMessageHours, setSinceLastMessageHours] = useState<
    number | ""
  >("");
  const [sinceLastMessageMinutes, setSinceLastMessageMinutes] = useState<
    number | ""
  >("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function initializeValues() {
      if (discordServer && id) {
        setTicketNameStyle(discordServer.ticketNameStyle);
        setTicketTranscriptChannelId(
          discordServer.ticketTranscriptChannelId || "none"
        );
        setMaxTicketPerUser(discordServer.maxTicketPerUser || 1);
        setAttachFiles(
          discordServer.ticketPermissions.includes("ATTACH_FILES")
            ? true
            : false
        );
        setEmbedLinks(
          discordServer.ticketPermissions.includes("EMBED_LINKS") ? true : false
        );
        setAddReactions(
          discordServer.ticketPermissions.includes("ADD_REACTIONS")
            ? true
            : false
        );
        setAutoCloseEnabled(discordServer.autoClose.enabled);
        setCloseWhenUserLeaves(discordServer.autoClose.closeOnUserLeave);

        if (discordServer.autoClose.sinceOpenWithNoResponse) {
          const convertedOpenNoResponse = convertToDaysHoursMins(
            discordServer.autoClose.sinceOpenWithNoResponse
          );
          setOpenNoResponseDays(convertedOpenNoResponse.days);
          setOpenNoResponseHours(convertedOpenNoResponse.hours);
          setOpenNoResponseMinutes(convertedOpenNoResponse.mins);
        } else {
          setOpenNoResponseDays("");
          setOpenNoResponseHours("");
          setOpenNoResponseMinutes("");
        }

        if (discordServer.autoClose.sinceLastMessage) {
          const convertedSinceLastMessage = convertToDaysHoursMins(
            discordServer.autoClose.sinceLastMessage
          );

          setSinceLastMessageDays(convertedSinceLastMessage.days);
          setSinceLastMessageHours(convertedSinceLastMessage.hours);
          setSinceLastMessageMinutes(convertedSinceLastMessage.mins);
        } else {
          setSinceLastMessageDays("");
          setSinceLastMessageHours("");
          setSinceLastMessageMinutes("");
        }
      }
    }
    initializeValues();
  }, [discordServer, id]);

  // Handlers to update state when input changes
  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTicketNameStyle(event.target.value);
    },
    []
  );

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      if (id === "maxTicketPerUser") {
        setMaxTicketPerUser(
          value === "" && value.length === 0 ? "" : Number(value)
        );
      }
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

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    setTicketTranscriptChannelId(event.target.value as string);
  }, []);

  const handleSave = async () => {
    const serverSettings = {
      ticketNameStyle,
      ticketTranscriptChannelId,
      maxTicketPerUser,
      attachFiles,
      embedLinks,
      addReactions,
      autoCloseEnabled,
      closeWhenUserLeaves,
      openNoResponseDays,
      openNoResponseHours,
      openNoResponseMinutes,
      sinceLastMessageDays,
      sinceLastMessageHours,
      sinceLastMessageMinutes,
    };

    try {
      setIsSaving(true);
      const res = await fetch(
        `http://localhost:6969/dashboard/update-server/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serverSettings),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update server settings");
      }

      const data = await res.json();
      // Handle success, e.g., show a success message
      console.log("Settings updated successfully!");
      // console.log(data);
      if (data) window.location.reload();
    } catch (error) {
      console.error("Error updating settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

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
        Settings
      </Typography>

      <FormControl sx={{ margin: 1.5 }}>
        <FormLabel
          id="ticketNameStyle"
          sx={{
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Ticket name style
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="ticketNameStyle"
          name="ticketNameStyle"
          value={ticketNameStyle}
          onChange={handleRadioChange}
        >
          <RadioButtonWithLabel value="number" label="By Number (#ticket-0)" />
          <RadioButtonWithLabel
            value="name"
            label="By Name (#ticket-sush1sui)"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl sx={{ margin: 1.5, width: "400px" }}>
        <FormLabel
          htmlFor="ticketTranscriptChannelId"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Ticket transcript channel
        </FormLabel>

        <CustomSelect
          id="ticketTranscriptChannelId"
          value={ticketTranscriptChannelId}
          handleSelectChange={handleSelectChange}
          items={channels}
        />
      </FormControl>
      <FormControl sx={{ margin: 1.5, marginLeft: 5 }}>
        <FormLabel
          htmlFor="maxTicketPerUser"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Max ticket per user
        </FormLabel>

        <CustomNumberTextField
          id="maxTicketPerUser"
          label="Max ticket per user"
          value={maxTicketPerUser}
          handleTextFieldChange={handleTextFieldChange}
        />
      </FormControl>
      <br />
      <FormGroup sx={{ margin: 1.5 }}>
        <Typography
          sx={{
            color: "white",
          }}
        >
          Ticket Permissions
        </Typography>

        <Box display={"flex"} gap={5}>
          <CustomSwitch
            checked={attachFiles}
            handleSwitchChange={handleSwitchChange}
            stateAction={setAttachFiles}
            label="Attach Files"
          />
          <CustomSwitch
            checked={embedLinks}
            handleSwitchChange={handleSwitchChange}
            stateAction={setEmbedLinks}
            label="Embed Links"
          />
          <CustomSwitch
            checked={addReactions}
            handleSwitchChange={handleSwitchChange}
            stateAction={setAddReactions}
            label="Add Reactions"
          />
        </Box>
      </FormGroup>
      <br />
      <FormGroup sx={{ margin: 1.5, marginTop: 0 }}>
        <Typography
          sx={{
            color: "white",
          }}
        >
          Auto Close
        </Typography>
        <Box display={"flex"} gap={5}>
          <CustomCheckbox
            label="Enabled"
            checked={autoCloseEnabled}
            stateAction={setAutoCloseEnabled}
          />
          <CustomCheckbox
            label="Close when user leave"
            checked={closeWhenUserLeaves}
            stateAction={setCloseWhenUserLeaves}
          />
        </Box>
      </FormGroup>
      <br />
      <FormGroup
        sx={{
          margin: 1.5,
          marginTop: 0,
          gap: 7,
          flexDirection: "row",
        }}
      >
        <FormControl>
          <Typography
            sx={{
              color: "white",
              marginBottom: 2,
            }}
          >
            Since open with no response
          </Typography>

          <Box display={"flex"} gap={2}>
            <CustomNumberTextField2
              id="openNoResponseDAY"
              label="Day"
              stateAction={setOpenNoResponseDays}
              value={openNoResponseDays}
            />
            <CustomNumberTextField2
              id="openNoResponseHOUR"
              label="Hour"
              stateAction={setOpenNoResponseHours}
              value={openNoResponseHours}
            />
            <CustomNumberTextField2
              id="openNoResponseMIN"
              label="Min"
              stateAction={setOpenNoResponseMinutes}
              value={openNoResponseMinutes}
            />
          </Box>
        </FormControl>
        <FormControl>
          <Typography
            sx={{
              color: "white",
              marginBottom: 2,
            }}
          >
            Since last message
          </Typography>

          <Box display={"flex"} gap={2}>
            <CustomNumberTextField2
              value={sinceLastMessageDays}
              stateAction={setSinceLastMessageDays}
              id="sinceLastMessageDAY"
              label="Day"
            />
            <CustomNumberTextField2
              value={sinceLastMessageHours}
              stateAction={setSinceLastMessageHours}
              id="sinceLastMessageHOUR"
              label="Hour"
            />
            <CustomNumberTextField2
              value={sinceLastMessageMinutes}
              stateAction={setSinceLastMessageMinutes}
              id="sinceLastMessageMIN"
              label="Min"
            />
          </Box>
        </FormControl>
      </FormGroup>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <PlainButton
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center", // Center content horizontally
            alignItems: "center", // Center content vertically
            position: "relative", // Ensure positioning of CircularProgress
          }}
          disabled={isSaving}
          onClick={handleSave}
        >
          {isSaving ? <CircularProgress color="inherit" size={24} /> : "SAVE"}
        </PlainButton>
      </Box>
    </Box>
  );
}
