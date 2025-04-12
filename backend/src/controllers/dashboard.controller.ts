import { Response, Request } from "express";
import UserModel from "../models/User.model";
import { client } from "../bot";
import { CustomRequest, UserGuildDataType } from "./auth.controller";
import DiscordServerModel from "../models/DiscordServer.model";
import { updateDiscordServer } from "../utils/discordServerHelper";
import { convertToDateOrNumber } from "../utils/helpers";

export const getAdminServers = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.accessToken) {
      res.status(401).json({ error: "Unauthorized: No access token" });
      return;
    }

    const user = await UserModel.findById(req.user.user.id);
    if (!user) {
      res.status(401).json({ error: "Unauthorized: User not found" });
      return;
    }

    // Fetch user's guilds from Discord API
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
    });

    if (!response.ok) {
      res
        .status(401)
        .json({ error: "Failed to fetch user guilds from Discord" });
      return;
    }

    const userGuildsData = (await response.json()) as UserGuildDataType[];

    const mutualAdminGuilds = await filterAdminServers(userGuildsData);

    res.json(mutualAdminGuilds);
  } catch (error) {
    console.error("Error fetching admin servers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchServer = async (req: Request, res: Response) => {
  const { id } = req.params;

  const clientGuild = client.guilds.cache.get(id);
  if (!clientGuild) {
    res
      .status(404)
      .json({ error: "Server not found, add the bot in your discord server" });
    return;
  }

  const existingDiscordServer = await DiscordServerModel.findOne({
    serverId: id,
  });

  if (!existingDiscordServer) {
    const newDiscordServer = await DiscordServerModel.create({
      serverId: id,
      name: clientGuild.name,
      icon: clientGuild.icon
        ? `https://cdn.discordapp.com/icons/${clientGuild.id}/${clientGuild.icon}.png`
        : null,
      ticketNameStyle: "number",
      maxTicketPerUser: 1,
    });
    res.json({ discordServer: newDiscordServer });
    return;
  }
  res.json({ discordServer: existingDiscordServer });
  return;
};

export const updateServer = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  if (!req.user?.accessToken) {
    res.status(401).json({ error: "Unauthorized: No access token" });
    return;
  }

  const user = await UserModel.findById(req.user.user.id);
  if (!user) {
    res.status(401).json({ error: "Unauthorized: User not found" });
    return;
  }

  // Fetch user's guilds from Discord API
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
    },
  });

  if (!response.ok) {
    res.status(401).json({ error: "Failed to fetch user guilds from Discord" });
    return;
  }

  const userGuildsData = (await response.json()) as UserGuildDataType[];

  const mutualAdminGuilds = await filterAdminServers(userGuildsData);

  const isUserAuthorized = mutualAdminGuilds.some((guild) => guild.id === id);

  if (!isUserAuthorized) {
    res.status(403).json({ error: "User is not an admin of this server" });
    return;
  }

  const {
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
  } = req.body;

  const payload = {
    ticketNameStyle,
    ticketTranscriptChannelId,
    maxTicketPerUser,
    ticketPermissions: [
      attachFiles && "ATTACH_FILES", // If attachFiles is true, add 'ATTACH_FILES'
      embedLinks && "EMBED_LINKS", // If embedLinks is true, add 'EMBED_LINKS'
      addReactions && "ADD_REACTIONS", // If addReactions is true, add 'ADD_REACTIONS'
    ].filter(Boolean),
    autoClose: {
      enabled: autoCloseEnabled,
      closeOnUserLeave: closeWhenUserLeaves,
      sinceOpenWithNoResponse: convertToDateOrNumber({
        days: openNoResponseDays,
        hours: openNoResponseHours,
        mins: openNoResponseMinutes,
      }),
      sinceLastMessage: convertToDateOrNumber({
        days: sinceLastMessageDays,
        hours: sinceLastMessageHours,
        mins: sinceLastMessageMinutes,
      }),
    },
  };

  const updatedServer = await updateDiscordServer(id, payload);

  res.json(updatedServer);
  return;
};

export const getChannelIds = async (req: Request, res: Response) => {
  const { id } = req.params;

  const clientGuild = client.guilds.cache.get(id);
  if (!clientGuild) {
    res
      .status(404)
      .json({ error: "Server not found, add the bot in your discord server" });
    return;
  }

  // Get the IDs of all text channels in the guild
  const textChannels = clientGuild.channels.cache
    .filter((c) => c.type === 0) // Filter for text channels
    .map((c) => ({ name: c.name, id: c.id })); // Map to extract the channel IDs and Names

  // If no text channels are found, return a message indicating this
  if (textChannels.length === 0) {
    return res
      .status(200)
      .json({ message: "No text channels found in this guild." });
  }

  // Send the list of text channel IDs back in the response
  return res.status(200).json(textChannels);
};

export const filterAdminServers = async (
  userGuildsData: UserGuildDataType[]
) => {
  // Filter guilds where user is an admin or owner
  const adminGuilds = userGuildsData.filter((guild) => {
    const permissions = BigInt(guild.permissions);
    const hasAdminPermission = (permissions & BigInt(0x8)) === BigInt(0x8); // 0x8 = ADMINISTRATOR
    return guild.owner || hasAdminPermission;
  });

  // Compare with bot's mutual guilds
  const botGuilds = client.guilds.cache;
  const mutualAdminGuilds = adminGuilds
    .filter((guild) => botGuilds.has(guild.id))
    .map((guild) => ({
      id: guild.id,
      name: guild.name,
      icon: guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
        : null,
    }));

  return mutualAdminGuilds;
};
