import {
  Box,
  CircularProgress,
  FormControl,
  FormGroup,
  FormLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { parentStyle, styles } from "../../../utils/helper";
import { useDiscordServer } from "../../../context/DiscordServerContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomSelect from "../../../components/CustomSelect";
import CustomMultiSelect from "../../../components/CustomMultiSelect";
import CustomCheckbox from "../../../components/CustomCheckbox";
import CustomTextField from "../../../components/CustomTextField";
import DividerWithTitle from "../../../components/DividerWithTitle";
import CustomTextArea from "../../../components/CustomTextArea";
import { PlainButton } from "../../../components/PlainButton";

export default function MultiPanel() {
  const { id } = useParams();
  const { channels, panels } = useDiscordServer();
  const [channelId, setChannelId] = useState<string>("");
  const [selectedPanels, setSelectedPanels] = useState<
    { name: string; id: string }[]
  >([]);
  const [useDropdown, setUseDropdown] = useState(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] = useState("");
  const [embedColor, setEmbedColor] = useState("#FFFFFF");
  const [panelTitle, setPanelTitle] = useState("");
  const [panelTitleUrl, setPanelTitleUrl] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");
  const [authorIconUrl, setAuthorIconUrl] = useState("");
  const [largeImageUrl, setLargeImageUrl] = useState("");
  const [smallImageUrl, setSmallImageUrl] = useState("");
  const [footerText, setFooterText] = useState("");
  const [footerIconUrl, setFooterIconUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Box sx={parentStyle}>
      <Typography
        variant="h3"
        sx={{ color: "white" }}
        margin={1.5}
        marginTop={0.5}
      >
        Create Multi-Panel
      </Typography>

      <FormControl sx={{ ...styles, width: "450px" }}>
        <FormLabel
          htmlFor="channelId"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Panel channel
        </FormLabel>

        <CustomSelect
          id="channelId"
          value={channelId}
          placeholder="Select which channel the multi-panel will be sent."
          handleSelectChange={(event: SelectChangeEvent) =>
            setChannelId(event.target.value as string)
          }
          items={channels.map((c) => ({
            name: c.name,
            value: c.value,
            disabled: false,
          }))}
        />
      </FormControl>
      <br />
      <FormControl sx={{ ...styles, width: "300px" }}>
        <FormLabel
          htmlFor="selectedPanels"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Panels (Minimum of 2)
        </FormLabel>

        <CustomMultiSelect
          id="selectedPanels"
          values={selectedPanels}
          handleChange={(e) => {
            const selectedIds = e.target.value as string[];
            const selected = panels
              .filter((p) => selectedIds.includes(p.id))
              .map((p) => ({ id: p.id, name: p.title }));

            setSelectedPanels(selected);
          }}
          items={panels.map((p) => ({
            name: p.title,
            value: p.id,
            disabled: false,
          }))}
        />
      </FormControl>

      <Box display={"flex"}>
        <FormGroup sx={{ ...styles, marginTop: 0 }}>
          <CustomCheckbox
            label="Use Dropdown Menu"
            checked={useDropdown}
            stateAction={setUseDropdown}
          />
        </FormGroup>

        <FormControl sx={{ ...styles, marginTop: 1.3 }}>
          <FormLabel
            htmlFor="dropdownPlaceholder"
            sx={{
              color: "white",
              mb: 1,
              "&.Mui-focused": {
                color: "white",
              },
            }}
          >
            Dropdown placeholder
          </FormLabel>

          <CustomTextField
            id="dropdownPlaceholder"
            value={dropdownPlaceholder}
            placeholder="Dropdown placeholder"
            handleTextFieldChange={(e) =>
              setDropdownPlaceholder(e.target.value)
            }
          />
        </FormControl>
      </Box>
      <br />
      <DividerWithTitle title="Message" />
      <Box display={"flex"}>
        <FormControl sx={{ ...styles }}>
          <FormLabel
            htmlFor="panelTitle"
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
            id="panelTitle"
            value={panelTitle}
            placeholder="Panel title"
            handleTextFieldChange={(e) => setPanelTitle(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ ...styles }}>
          <FormLabel
            htmlFor="titleUrl"
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
            id="titleUrl"
            value={panelTitleUrl}
            placeholder="Panel Title URL"
            handleTextFieldChange={(e) => setPanelTitleUrl(e.target.value)}
          />
        </FormControl>
      </Box>
      <br />
      <FormControl sx={{ ...styles, width: "400px" }}>
        <FormLabel
          htmlFor="description"
          sx={{
            color: "white",
            mb: 1,
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Description
        </FormLabel>

        <CustomTextArea
          value={description}
          id="description"
          placeholder="Description here..."
          handleTextFieldChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </FormControl>
      <br />
      <Box display={"flex"}>
        <FormControl sx={{ ...styles }}>
          <FormLabel
            htmlFor="authorName"
            sx={{
              color: "white",
              mb: 1,
              "&.Mui-focused": {
                color: "white",
              },
            }}
          >
            Author name
          </FormLabel>

          <CustomTextField
            id="authorName"
            value={authorName}
            placeholder="Author name"
            handleTextFieldChange={(e) => setAuthorName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ ...styles, width: "300px" }}>
          <FormLabel
            htmlFor="setAuthorIconUrl"
            sx={{
              color: "white",
              mb: 1,
              "&.Mui-focused": {
                color: "white",
              },
            }}
          >
            Author icon url
          </FormLabel>

          <CustomTextField
            id="setAuthorIconUrl"
            value={authorIconUrl}
            placeholder="https://example.com/image.png"
            handleTextFieldChange={(e) => setAuthorIconUrl(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ ...styles, width: "300px" }}>
          <FormLabel
            htmlFor="authorUrl"
            sx={{
              color: "white",
              mb: 1,
              "&.Mui-focused": {
                color: "white",
              },
            }}
          >
            Author url
          </FormLabel>

          <CustomTextField
            id="authorUrl"
            value={authorUrl}
            placeholder="https://example.com"
            handleTextFieldChange={(e) => setAuthorUrl(e.target.value)}
          />
        </FormControl>
      </Box>
      <br />
      <Box display={"flex"}>
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
            placeholder="https://example.com/image.png"
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
            placeholder="https://example.com/image.png"
            handleTextFieldChange={(e) => setSmallImageUrl(e.target.value)}
          />
        </FormControl>
      </Box>
      <br />
      <Box display={"flex"}>
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
      </Box>
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
          // onClick={handleCreate}
        >
          {isSaving ? <CircularProgress color="inherit" size={24} /> : "CREATE"}
        </PlainButton>
      </Box>
    </Box>
  );
}
