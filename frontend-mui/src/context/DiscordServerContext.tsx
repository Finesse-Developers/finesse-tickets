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

type PanelType = {
  serverId: string;
  mentionOnOpenRoleIds: string[];
  ticketCategoryId: string;
  title: string;
  content: string;
  panelColor: string;
  channelId: string;
  channelName: string;
  buttonColor: string;
  buttonText: string;
  buttonEmoji: string | null;
  largeImageUrl: string | null;
  smallImageUrl: string | null;
  welcomeMessage: {
    embedColor: string;
    title: string;
    titleUrl: string | null;
    largeImageUrl: string | null;
    smallImageUrl: string | null;
    footerText: string | null;
    footerIconUrl: string | null;
  };
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
  panels: PanelType[];
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
  const [panels, setPanels] = useState<PanelType[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchServer() {
      try {
        setLoading(true);
        setDiscordServer(null);
        setError(null);
        setChannels([]);
        setPanels([]);

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

        const panelData = await getPanels();

        if (panelData) setPanels(panelData);

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
      return;
    }
  };

  const getPanels = async () => {
    try {
      const res = await fetch(`http://localhost:6969/panel/get-panels/${id}`, {
        credentials: "include",
      });
      if (!res.ok) {
        setError("Something went wrong in fetching panels, please try again.");
        return;
      }
      const data: PanelType[] = await res.json();
      return data;
    } catch (error) {
      setError("Something went wrong in fetching panels, please try again.");
      console.log(error);
      return;
    }
  };

  return (
    <DiscordServerContext.Provider
      value={{ discordServer, loading, getServer, error, channels, panels }}
    >
      {children}
    </DiscordServerContext.Provider>
  );
};
