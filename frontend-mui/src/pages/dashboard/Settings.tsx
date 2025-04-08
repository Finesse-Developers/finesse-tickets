import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Settings() {
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
          <FormControlLabel
            value="number"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ color: "white" }}>
                By Number (#ticket-0)
              </Typography>
            }
          />
          <FormControlLabel
            value="name"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ color: "white" }}>
                By Name (#ticket-sush1sui)
              </Typography>
            }
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

        <Select
          id="ticketTranscriptChannelId"
          value={ticketTranscriptChannelId}
          onChange={handleSelectChange}
          displayEmpty
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
          <MenuItem value="" disabled>
            <em>Please select transcript channel</em>
          </MenuItem>
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="1">Dev logs</MenuItem>
          <MenuItem value="2">Mod logs</MenuItem>
          <MenuItem value="3">Admin logs</MenuItem>
        </Select>
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

        <TextField
          id="maxTicketPerUser"
          label="Max ticket per user"
          type="number"
          variant="outlined"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={maxTicketPerUser}
          onChange={handleTextFieldChange}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Outline color
              },
              "&:hover fieldset": {
                borderColor: "white", // Hover outline color
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Focused outline color
              },
              "& input": {
                color: "white", // Text color inside the input
              },
            },
            "& .MuiInputLabel-root": {
              color: "white", // Label color when not focused
            },
          }}
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
          <FormControlLabel
            control={
              <Switch
                checked={attachFiles}
                onChange={(e) => handleSwitchChange(e, setAttachFiles)}
                sx={{
                  color: "white", // Default color
                  "&.Mui-checked": {
                    color: "white", // Color of the thumb when checked
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#fff", // Track color when not checked
                  },
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "#fff", // Thumb color when checked
                  },
                  "&.Mui-checked .MuiSwitch-thumb": {
                    backgroundColor: "#fff", // Thumb color when checked
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "white", // Default color
                }}
              >
                Attach Files
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={embedLinks}
                onChange={(e) => handleSwitchChange(e, setEmbedLinks)}
                sx={{
                  color: "white", // Default color
                  "&.Mui-checked": {
                    color: "white", // Color of the thumb when checked
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#fff", // Track color when not checked
                  },
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "#fff", // Thumb color when checked
                  },
                  "&.Mui-checked .MuiSwitch-thumb": {
                    backgroundColor: "#fff", // Thumb color when checked
                  },
                }}
              />
            }
            label={<Typography sx={{ color: "white" }}>Embed Links</Typography>}
          />
          <FormControlLabel
            control={
              <Switch
                checked={addReactions}
                onChange={(e) => handleSwitchChange(e, setAddReactions)}
                sx={{
                  color: "white", // Default color
                  "&.Mui-checked": {
                    color: "white", // Color of the thumb when checked
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#fff", // Track color when not checked
                  },
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "#fff", // Thumb color when checked
                  },
                  "&.Mui-checked .MuiSwitch-thumb": {
                    backgroundColor: "#fff", // Thumb color when checked
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "white", // Default color
                }}
              >
                Add Reactions
              </Typography>
            }
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
          <FormControlLabel
            control={
              <Checkbox
                checked={autoCloseEnabled}
                onChange={(e) => setAutoCloseEnabled(e.target.checked)}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "#fff",
                  },
                }}
              />
            }
            label="Enabled"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={closeWhenUserLeaves}
                onChange={(e) => setCloseWhenUserLeaves(e.target.checked)}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "#fff",
                  },
                }}
              />
            }
            label="Close when user leave"
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
            <TextField
              value={openNoResponseDays}
              onChange={(e) => setOpenNoResponseDays(Number(e.target.value))}
              id="openNoResponseDAY"
              label="Day"
              type="number"
              variant="filled" // Changed to filled to remove the outline
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                width: "120px",
                color: "white",
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent", // No background color (box effect)
                  border: "1px solid white", // Add border to make it appear as a box
                  borderRadius: "4px", // Optional: adjust border radius to make it look like a box
                },
                "& .MuiFilledInput-input": {
                  color: "white", // Input text color
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiInputBase-root:hover": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused .MuiFilledInput-root": {
                  borderColor: "white", // Border color when focused
                },
              }}
            />
            <TextField
              value={openNoResponseHours}
              onChange={(e) => setOpenNoResponseHours(Number(e.target.value))}
              id="openNoResponseHOUR"
              label="Hour"
              type="number"
              variant="filled" // Changed to filled to remove the outline
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                width: "120px",
                color: "white",
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  borderRadius: "4px",
                },
                "& .MuiFilledInput-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root:hover": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiFilledInput-root": {
                  borderColor: "white",
                },
              }}
            />
            <TextField
              value={openNoResponseMinutes}
              onChange={(e) => setOpenNoResponseMinutes(Number(e.target.value))}
              id="openNoResponseMIN"
              label="Min"
              type="number"
              variant="filled" // Changed to filled to remove the outline
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                width: "120px",
                color: "white",
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  borderRadius: "4px",
                },
                "& .MuiFilledInput-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root:hover": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiFilledInput-root": {
                  borderColor: "white",
                },
              }}
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
            <TextField
              value={sinceLastMessageDays}
              onChange={(e) => setSinceLastMessageDays(Number(e.target.value))}
              id="sinceLastMessageDAY"
              label="Day"
              type="number"
              variant="filled" // Changed to filled to remove the outline
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                width: "120px",
                color: "white",
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent", // No background color (box effect)
                  border: "1px solid white", // Add border to make it appear as a box
                  borderRadius: "4px", // Optional: adjust border radius to make it look like a box
                },
                "& .MuiFilledInput-input": {
                  color: "white", // Input text color
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiInputBase-root:hover": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused .MuiFilledInput-root": {
                  borderColor: "white", // Border color when focused
                },
              }}
            />
            <TextField
              value={sinceLastMessageHours}
              onChange={(e) => setSinceLastMessageHours(Number(e.target.value))}
              id="sinceLastMessageHOUR"
              label="Hour"
              type="number"
              variant="filled" // Changed to filled to remove the outline
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                width: "120px",
                color: "white",
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  borderRadius: "4px",
                },
                "& .MuiFilledInput-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root:hover": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiFilledInput-root": {
                  borderColor: "white",
                },
              }}
            />
            <TextField
              value={sinceLastMessageMinutes}
              onChange={(e) =>
                setSinceLastMessageMinutes(Number(e.target.value))
              }
              id="sinceLastMessageMIN"
              label="Min"
              type="number"
              variant="filled" // Changed to filled to remove the outline
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                width: "120px",
                color: "white",
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  borderRadius: "4px",
                },
                "& .MuiFilledInput-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root:hover": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiFilledInput-root": {
                  borderColor: "white",
                },
              }}
            />
          </Box>
        </FormControl>
      </FormGroup>
    </Box>
  );
}
