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
  EmojiType,
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
  const [categories, setCategories] = useState<{ name: string; id: string }[]>(
    []
  );
  const [emojis, setEmojis] = useState<EmojiType[]>([]);
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

        const rolesAndCategoriesData = await getRolesAndCategories();
        if (rolesAndCategoriesData?.categories)
          setCategories(rolesAndCategoriesData.categories);

        if (rolesAndCategoriesData?.roles)
          setRoles(rolesAndCategoriesData.roles);

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

        const emojisData = await getEmojis();
        if (emojisData) setEmojis(emojisData);

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
    setChannels([]);
    setPanels([]);
    setMultiPanels([]);
    setRoles([]);
    setCategories([]);
    setEmojis([]);
    setError(null);
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

  const getRolesAndCategories = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:6969/dashboard/get-roles-categories/${id}`,
        { credentials: "include" }
      );

      const data: {
        roles: { name: string; id: string }[];
        categories: { name: string; id: string }[];
      } = await res.json();
      return data;
    } catch (error) {
      setError(
        "Something went wrong in fetching roles and categories, please try again."
      );
      console.log(error);
      return;
    }
  }, [id]);

  const getEmojis = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:6969/dashboard/get-all-emojis/${id}`,
        { credentials: "include" }
      );

      const data: EmojiType[] = await res.json();
      return data;
    } catch (error) {
      setError("Something went wrong in fetching emojis, please try again.");
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
      categories,
      emojis,
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
      categories,
      emojis,
    ]
  );

  return (
    <DiscordServerContext.Provider value={contextValue}>
      {children}
    </DiscordServerContext.Provider>
  );
};
