import mongoose, { Document, Model } from "mongoose";

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

export interface DiscordServerDocument extends DiscordServerType, Document {}
export interface DiscordServerModel extends Model<DiscordServerDocument> {}

const timeConfigSchema = {
  day: { type: Number, required: true },
  hour: { type: Number, required: true },
  min: { type: Number, required: true },
  _id: false,
};

const discordServerSchema = new mongoose.Schema({
  serverId: { type: String, required: true, unique: true },
  icon: { type: String, default: null },
  name: { type: String, required: true },
  ticketNameStyle: { type: String, enum: ["name", "number"], required: true },
  ticketTranscriptChannelId: { type: String, default: null },
  maxTicketPerUser: { type: Number, required: true },
  ticketPermissions: {
    type: [String],
    required: true,
    default: [],
  },
  autoClose: {
    enabled: { type: Boolean, required: true, default: false },
    closeOnUserLeave: { type: Boolean, required: true, default: false },
    sinceOpenWithNoResponse: { type: timeConfigSchema, default: null },
    sinceLastMessage: { type: timeConfigSchema, default: null },
  },
  transcripts: { type: [String], default: [] },
  staffMembers: { type: [String], default: [] },
});

export default mongoose.model<DiscordServerDocument, DiscordServerModel>(
  "DiscordServer",
  discordServerSchema
);
