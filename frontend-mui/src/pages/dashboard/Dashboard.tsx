import { Box, CircularProgress, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { redirectToHomeIfNotAuth } from "../../guards/Auth.ProtectedRoutes";

export interface DiscordServerType {
  serverId: string;
  name: string;
  icon: string | null;
  ticketNameStyle: "name" | "number";
  ticketTranscriptChannelId: string | null;
  maxTicketPerUser: number;
  ticketPermissions: string[];
  autoClose: {
    enabled: boolean;
    closeOnUserLeave: boolean;
    sinceOpenWithNoResponse: number | null; // seconds
    sinceLastMessage: number | null; // seconds
  };
  transcripts: string[]; // array of closed ticket transcript ids
  staffMembers: string[]; // array of discord user ids
}

export default function Dashboard() {
  const { id } = useParams();
  const [discordServer, setDiscordServer] = useState<DiscordServerType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchServer() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        setDiscordServer(null);

        const res = await fetch(
          `http://localhost:6969/dashboard/fetch-server/${id}`,
          { credentials: "include" }
        );

        redirectToHomeIfNotAuth(res, nav);

        if (!res.ok) {
          setErrorMessage(
            "Something went wrong in the server, please try again."
          );
          return;
        }

        const data = await res.json();
        // console.log(data.discordServer);

        setDiscordServer(data.discordServer);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "Something went wrong in the server, please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (id && id !== undefined) {
      fetchServer();
    } else {
      nav("/dashboard");
    }
  }, [id]);

  if (!id) nav("/dashboard");

  if (isLoading || !discordServer) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" color="white">
          {errorMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "auto",
        border: "1px solid red",
      }}
    >
      <Sidebar discordServer={discordServer} />
      <Outlet />
    </Box>
  );
}
