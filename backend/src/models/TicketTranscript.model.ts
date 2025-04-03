import mongoose, { Document, Model } from "mongoose";

export type ConvoType = {
  userId: string;
  username: string;
  profileUrl: string;
  message: string;
  imageUrl: string[];
  datetime: Date;
};

export type TicketTranscriptType = {
  transcriptId: string;
  serverId: string;
  ticketName: string;
  conversation: ConvoType[];
};

export interface TicketTranscriptDocument
  extends TicketTranscriptType,
    Document {}
export interface TicketTranscriptModel
  extends Model<TicketTranscriptDocument> {}

const ticketTranscriptSchema = new mongoose.Schema(
  {
    transcriptId: { type: String, required: true },
    serverId: { type: String, required: true },
    ticketName: { type: String, required: true },
    conversation: [
      {
        userId: { type: String, required: true },
        username: { type: String, required: true },
        profileUrl: { type: String, required: true },
        message: { type: String, required: true },
        imageUrl: { type: [String], default: [] },
        datetime: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<TicketTranscriptDocument, TicketTranscriptModel>(
  "TicketTranscript",
  ticketTranscriptSchema
);
