import DiscordServerModel from "../models/DiscordServer.model";

// create
export async function createDiscordServer(
  serverId: string,
  name: string,
  staffMembers: string[] = []
) {
  try {
    const newServer = await DiscordServerModel.create({
      serverId,
      name,
      staffMembers,
      ticketNameStyle: "number",
      ticketTranscriptChannelId: null,
      maxTicketPerUser: 1,
      ticketPermissions: [],
      autoClose: {
        enabled: false,
        closeOnUserLeave: false,
        sinceOpenWithNoResponse: null,
        sinceLastMessage: null,
      },
      transcripts: [],
    });
    console.log(`Created server: ${name}, Server ID: ${serverId}`);
    return newServer;
  } catch (error) {
    console.error(error);
    return;
  }
}

// read
export async function getDiscordServer(serverId: string) {
  try {
    const server = await DiscordServerModel.findOne({ serverId });
    if (!server) throw new Error("Server not found");
    return server;
  } catch (error) {
    console.error(`Error fetching server: ${error}`);
    return;
  }
}

// update
export async function updateDiscordServer(
  serverId: string,
  updateData: Partial<Record<string, any>>
) {
  try {
    const updatedServer = await DiscordServerModel.findOneAndUpdate(
      { serverId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedServer) throw new Error("Server not found or update failed");
    console.log(`Updated server: ${serverId}`);
    return updatedServer;
  } catch (error) {
    console.error(`Error updating server: ${error}`);
    return;
  }
}

// delete
export async function deleteDiscordServer(serverId: string) {
  try {
    const deletedServer = await DiscordServerModel.findOneAndDelete({
      serverId,
    });

    if (!deletedServer) throw new Error("Server not found or already deleted");
    console.log(`Deleted server: ${serverId}`);
    return deletedServer;
  } catch (error) {
    console.error(`Error deleting server: ${error}`);
    return;
  }
}
