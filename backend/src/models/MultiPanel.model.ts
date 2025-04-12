import mongoose, { Document, Model } from "mongoose";

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

export interface MultiPanelDocument extends MultiPanelType, Document {}
export interface MultiPanelModel extends Model<MultiPanelDocument> {}

const multiPanelSchema = new mongoose.Schema({
  serverId: { type: String, required: true },
  channelId: { type: String, required: true },
  channelName: { type: String, required: true },
  panelTitlte: { type: String, required: true },
  panels: [
    {
      name: { type: String, required: true },
      id: { type: String, required: true, unique: true },
    },
  ],
  dropdown: {
    use: { type: Boolean, required: true },
    placeholder: { type: String, required: true },
  },
  embedMessage: {
    color: { type: String, required: true },
    title: { type: String, required: true },
    titleUrl: { type: String, default: null },
    description: { type: String, default: "" },
    authorName: { type: String, default: null },
    titleIconUrl: { type: String, default: null },
    largeImageUrl: { type: String, default: null },
    smallImageUrl: { type: String, default: null },
    footerText: { type: String, default: null },
    footerIconUrl: { type: String, default: null },
  },
});

export default mongoose.model<MultiPanelDocument, MultiPanelModel>(
  "MultiPanel",
  multiPanelSchema
);
