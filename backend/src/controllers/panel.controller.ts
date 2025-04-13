import { CustomRequest } from "./auth.controller";
import { Response } from "express";
import PanelModel from "../models/Panel.model";
import MultiPanelModel from "../models/MultiPanel.model";

export const getPanels = async (req: CustomRequest, res: Response) => {
  try {
    const { serverId } = req.params;

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
