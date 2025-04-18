import { Box, Typography } from "@mui/material";
import { PlainButton } from "../../../components/PlainButton";
import { Link, useParams } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import { useDiscordServer } from "../../../context/DiscordServerContext";

export default function Panels() {
  const { id } = useParams();
  const { panels, multiPanels } = useDiscordServer();

  return (
    <Box
      sx={{
        width: "75%",
        height: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "45%",
          minHeight: "52%",
          borderRadius: 2,
          border: "2px solid white",
          backgroundColor: "transparent",
          color: "white",
          alignSelf: "flex-start",
          marginLeft: 5,
          marginTop: 1.5,
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white" }}
          margin={2}
          marginTop={1.5}
        >
          Ticket Panels
        </Typography>

        <Box display="flex" flexDirection="column">
          <Box
            marginBottom={5}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingX={2}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Your Panels: {panels.length}/3
            </Typography>

            <Link
              to={`/dashboard/${id}/panel/create`}
              style={{ textDecoration: "none" }}
            >
              <PlainButton>+ New Panel</PlainButton>
            </Link>
          </Box>
          <CustomTable
            rows={panels.map((p) => ({
              id: p.channelId,
              channelName: p.channelName,
              panelTitle: p.title,
            }))}
            type="panel"
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "45%",
          minHeight: "52%",
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
          variant="h4"
          sx={{ color: "white" }}
          margin={2}
          marginTop={1.5}
        >
          Multi-Panels
        </Typography>

        <Box display="flex" flexDirection="column">
          <Box
            marginBottom={5}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingX={2}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Your Multi-Panels: {multiPanels.length}/3
            </Typography>

            <Link
              to={`/dashboard/${id}/panel/multi-create`}
              style={{ textDecoration: "none" }}
            >
              <PlainButton>+ New Multi-Panel</PlainButton>
            </Link>
          </Box>
          <CustomTable
            rows={multiPanels.map((p) => ({
              id: p.channelId,
              channelName: p.channelName,
              panelTitle: p.panelTitle,
            }))}
            type="multi-panel"
          />
        </Box>
      </Box>
    </Box>
  );
}
