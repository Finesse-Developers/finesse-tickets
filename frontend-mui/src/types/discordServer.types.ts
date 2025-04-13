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
    sinceOpenWithNoResponse: {
      day: number;
      hour: number;
      min: number;
    } | null;
    sinceLastMessage: {
      day: number;
      hour: number;
      min: number;
    } | null;
  };
  transcripts: string[]; // array of closed ticket transcript ids
  staffMembers: string[]; // array of discord user ids
};

export type PanelType = {
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

export type MultiPanelType = {
  serverId: string;
  channelId: string;
  channelName: string;
  panelTitle: string;
  panels: {
    name: string;
    id: string;
  }[];
  dropdown: {
    use: boolean;
    placeholder: string;
  };
  embedMessage: {
    color: string;
    title: string;
    titleUrl: string | null;
    description: string;
    authorName: string | null;
    titleIconUrl: string | null;
    largeImageUrl: string | null;
    smallImageUrl: string | null;
    footerText: string | null;
    footerIconUrl: string | null;
  };
};

export type ChannelData = Array<{ id: string; name: string }>;

export interface DiscordServerContextType {
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
  multiPanels: MultiPanelType[];
  roles: { name: string; id: string }[];
}
