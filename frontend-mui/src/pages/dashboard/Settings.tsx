import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import RadioButtonWithLabel from "../../components/RadioButtonWithLabel";
import CustomSelect from "../../components/CustomSelect";
import CustomNumberTextField from "../../components/CustomNumberTextField";
import CustomSwitch from "../../components/CustomSwitch";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomNumberTextField2 from "../../components/CustomNumberTextField2";
import { PlainButton } from "../../components/PlainButton";
import { useParams } from "react-router-dom";

const ticketTranscriptTemporaryChoices = [
  { name: "Please select transcript channel", value: "", disabled: true },
  { name: "None", value: "none", disabled: false },
  { name: "Dev Logs", value: "1", disabled: false },
  { name: "Admin Logs", value: "2", disabled: false },
  { name: "Mod Logs", value: "3", disabled: false },
  { name: "Ticket Transcripts", value: "4", disabled: false },
];

export default function Settings() {
  const { id } = useParams();
  const [ticketNameStyle, setTicketNameStyle] = useState<string>("number");
  const [ticketTranscriptChannelId, setTicketTranscriptChannelId] =
    useState<string>("");
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

  // Handlers to update state when input changes
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketNameStyle(event.target.value);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    if (id === "maxTicketPerUser") {
      setMaxTicketPerUser(
        value === "" && value.length === 0 ? "" : Number(value)
      );
    }
  };

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(event.target.checked);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setTicketTranscriptChannelId(event.target.value as string);
  };

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
      console.log(data);
    } catch (error) {
      console.error("Error updating settings:", error);
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
          items={ticketTranscriptTemporaryChoices}
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
        <PlainButton style={{ width: "80%" }} onClick={handleSave}>
          SAVE
        </PlainButton>
      </Box>
    </Box>
  );
}
