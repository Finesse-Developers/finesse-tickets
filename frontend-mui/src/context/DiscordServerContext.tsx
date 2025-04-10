import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { redirectToHomeIfNotAuth } from "../guards/Auth.ProtectedRoutes";

export type DiscordServerType = {
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
    sinceOpenWithNoResponse: Date | null; // seconds
    sinceLastMessage: Date | null; // seconds
  };
  transcripts: string[]; // array of closed ticket transcript ids
  staffMembers: string[]; // array of discord user ids
};

type ChannelData = Array<{ id: string; name: string }>;

interface DiscordServerContextType {
  discordServer: DiscordServerType | null;
  getServer: (server: DiscordServerType) => void;
  channels: {
    name: string;
    value: string;
    disabled: boolean;
  }[];
  loading: boolean;
  error: string | null;
}

const DiscordServerContext = createContext<DiscordServerContextType | null>(
  null
);

export const useDiscordServer = () => {
  const context = useContext(DiscordServerContext);
  if (!context) {
    throw new Error(
      "useDiscordServer must be used within an DiscordServerProvider"
    );
  }
  return context;
};

export const DiscordServerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { id } = useParams();
  const [discordServer, setDiscordServer] = useState<DiscordServerType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [channels, setChannels] = useState<
    { name: string; value: string; disabled: boolean }[]
  >([]);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchServer() {
      try {
        setLoading(true);
        setDiscordServer(null);
        setError(null);

        const res = await fetch(
          `http://localhost:6969/dashboard/fetch-server/${id}`,
          { credentials: "include" }
        );

        redirectToHomeIfNotAuth(res, nav);

        if (!res.ok) {
          setError("Something went wrong in the server, please try again.");
          return;
        }

        const data = await res.json();
        // console.log(data.discordServer);

        const channels = (await getChannelIds())?.map((c) => ({
          name: c.name,
          value: c.id,
          disabled: false,
        }));

        if (channels && channels !== undefined) {
          setChannels([
            { name: "None", value: "none", disabled: false },
            ...channels,
          ]);
        } else {
          setChannels([
            {
              name: "Please select transcript channel",
              value: "",
              disabled: true,
            },
            { name: "None", value: "none", disabled: false },
          ]);
        }

        setDiscordServer(data.discordServer);
      } catch (error) {
        console.error(error);
        setError("Something went wrong in the server, please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (id && id !== undefined) {
      fetchServer();
    } else {
      nav("/dashboard");
    }
  }, [id]);

  const getServer = (server: DiscordServerType) => {
    setDiscordServer(server);
  };

  const getChannelIds = async (): Promise<ChannelData | undefined> => {
    try {
      const res = await fetch(
        `http://localhost:6969/dashboard/get-channelIds/${id}`,
        { credentials: "include" }
      );
      if (!res.ok) {
        setError(
          "Something went wrong in fetching channels, please try again."
        );
        return;
      }
      const data: ChannelData = await res.json();
      return data;
    } catch (error) {
      setError("Something went wrong in fetching channels, please try again.");
      console.log(error);
    }
  };

  return (
    <DiscordServerContext.Provider
      value={{ discordServer, loading, getServer, error, channels }}
    >
      {children}
    </DiscordServerContext.Provider>
  );
};
