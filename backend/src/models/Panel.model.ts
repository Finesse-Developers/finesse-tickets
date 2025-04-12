import mongoose, { Document, Model } from "mongoose";

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

export interface PanelDocument extends PanelType, Document {}
export interface PanelModel extends Model<PanelDocument> {}

const panelSchema = new mongoose.Schema({
  serverId: { type: String, required: true },
  mentionOnOpenRoleIds: { type: [String], default: [] },
  ticketCategoryId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  panelColor: { type: String, required: true },
  channelId: { type: String, required: true },
  channelName: { type: String, required: true },
  buttonColor: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonEmoji: { type: String, default: null },
  largeImageUrl: { type: String, default: null },
  smallImageUrl: { type: String, default: null },
  welcomeMessage: {
    embedColor: { type: String, required: true },
    title: { type: String, required: true },
    titleUrl: { type: String, default: null },
    largeImageUrl: { type: String, default: null },
    smallImageUrl: { type: String, default: null },
    footerText: { type: String, default: null },
    footerIconUrl: { type: String, default: null },
  },
});

export default mongoose.model<PanelDocument, PanelModel>("Panel", panelSchema);
