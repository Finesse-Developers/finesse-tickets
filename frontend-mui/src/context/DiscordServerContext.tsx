import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { redirectToHomeIfNotAuth } from "../guards/Auth.ProtectedRoutes";
import {
  ChannelData,
  DiscordServerContextType,
  DiscordServerType,
  MultiPanelType,
  PanelType,
} from "../types/discordServer.types";

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
  const [multiPanels, setMultiPanels] = useState<MultiPanelType[]>([]);
  const [roles, setRoles] = useState<{ name: string; id: string }[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) {
      nav("/dashboard");
      return;
    }

    async function fetchServer() {
      try {
        setLoading(true);
        resetState();

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

        if (panelData) {
          setPanels(panelData.panels);
          setMultiPanels(panelData.multiPanels);
        }

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

        const roleData = await getRoles();
        if (roleData) setRoles(roleData);

        setDiscordServer(data.discordServer);
      } catch (error) {
        console.error(error);
        setError("Something went wrong in the server, please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchServer();
  }, [id]);

  const resetState = useCallback(() => {
    setDiscordServer(null);
    setError(null);
    setChannels([]);
    setPanels([]);
    setMultiPanels([]);
    setRoles([]);
  }, []);

  const getServer = useCallback((server: DiscordServerType) => {
    setDiscordServer(server);
  }, []);

  const getChannelIds = useCallback(async (): Promise<
    ChannelData | undefined
  > => {
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
  }, [id]);

  const getPanels = useCallback(async (): Promise<
    | {
        panels: PanelType[];
        multiPanels: MultiPanelType[];
      }
    | undefined
  > => {
    try {
      const res = await fetch(`http://localhost:6969/panel/get-panels/${id}`, {
        credentials: "include",
      });
      if (!res.ok) {
        setError("Something went wrong in fetching panels, please try again.");
        return;
      }
      const data: {
        panels: PanelType[];
        multiPanels: MultiPanelType[];
      } = await res.json();
      return data;
    } catch (error) {
      setError("Something went wrong in fetching panels, please try again.");
      console.log(error);
      return;
    }
  }, [id]);

  const getRoles = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:6969/dashboard/get-roles/${id}`,
        { credentials: "include" }
      );
      if (!res.ok) {
        setError("Something went wrong in fetching roles, please try again.");
        return;
      }
      const data: { name: string; id: string }[] = await res.json();
      return data;
    } catch (error) {
      setError("Something went wrong in fetching roles, please try again.");
      console.log(error);
      return;
    }
  }, [id]);

  const contextValue = useMemo(
    () => ({
      discordServer,
      loading,
      getServer,
      error,
      channels,
      panels,
      multiPanels,
      roles,
    }),
    [
      discordServer,
      loading,
      getServer,
      error,
      channels,
      panels,
      multiPanels,
      roles,
    ]
  );

  return (
    <DiscordServerContext.Provider value={contextValue}>
      {children}
    </DiscordServerContext.Provider>
  );
};
