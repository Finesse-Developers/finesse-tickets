import { CustomRequest, UserGuildDataType } from "./auth.controller";
import { Response /*Request*/ } from "express";
import { filterAdminServers } from "./dashboard.controller";
import UserModel from "../models/User.model";
import PanelModel from "../models/Panel.model";
import MultiPanelModel from "../models/MultiPanel.model";

export const getPanels = async (req: CustomRequest, res: Response) => {
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

    const { serverId } = req.params;

    const isAuthorized = mutualAdminGuilds.some(
      (guild) => guild.id === serverId
    );
    if (!isAuthorized) {
      res.status(401).json({ error: "Unauthorized: User not found" });
      return;
    }

    const panels = await PanelModel.find({ serverId });
    const multiPanels = await MultiPanelModel.find({ serverId });

    res.json({ panels, multiPanels });
    return;
  } catch (error) {
    console.error("Error getting panels:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const createPanel = async (req: CustomRequest, res: Response) => {
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

    const {
      serverId,
      mentionOnOpenRoleIds,
      ticketCategoryId,
      panelTitle,
      content,
      panelColor,
      channelId,
      channelName,
      buttonColor,
      buttonText,
      buttonEmoji,
      panelLargeImageUrl,
      panelSmallImageUrl,
      welcomeEmbedColor,
      welcomeTitle,
      welcomeTitleUrl,
      welcomeLargeImageUrl,
      welcomeSmallImageUrl,
      welcomeFooterText,
      welcomeFooterIconUrl,
    } = req.body;

    const isAuthorized = mutualAdminGuilds.some(
      (guild) => guild.id === serverId
    );
    if (!isAuthorized) {
      res.status(401).json({ error: "Unauthorized: User not found" });
      return;
    }

    const newPanel = await PanelModel.create({
      serverId,
      mentionOnOpenRoleIds,
      ticketCategoryId,
      title: panelTitle,
      content,
      panelColor,
      channelId,
      channelName,
      buttonColor,
      buttonText,
      buttonEmoji,
      largeImageUrl: panelLargeImageUrl,
      smallImageUrl: panelSmallImageUrl,
      welcomeMessage: {
        embedColor: welcomeEmbedColor,
        title: welcomeTitle,
        titleUrl: welcomeTitleUrl,
        largeImageUrl: welcomeLargeImageUrl,
        smallImageUrl: welcomeSmallImageUrl,
        footerText: welcomeFooterText,
        footerIconUrl: welcomeFooterIconUrl,
      },
    });

    res.json(newPanel);
    return;
  } catch (error) {
    console.error("Error creating panel:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
