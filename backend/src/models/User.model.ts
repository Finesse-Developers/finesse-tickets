import mongoose, { Document, Model } from "mongoose";

export type UserType = {
  discordId: string;
  username: string;
  avatar: string | null;
};
export interface UserDocument extends UserType, Document {}
export interface UserModel extends Model<UserDocument> {}

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String },
});

export default mongoose.model<UserDocument, UserModel>("User", userSchema);
