import TicketTranscriptModel, {
  ConvoType,
} from "../models/TicketTranscript.model";

// create
export async function createTicketTranscript(
  transcriptId: string,
  serverId: string,
  ticketName: string,
  conversation: ConvoType[]
) {
  try {
    const newTranscript = TicketTranscriptModel.create({
      transcriptId,
      serverId,
      ticketName,
      conversation,
    });
    console.log(
      `Created ticket transcript: ${ticketName} at Server ID: ${serverId}`
    );
    return newTranscript;
  } catch (error) {
    console.error(error);
    return;
  }
}

// delete
export async function deleteTicketTranscript(id: string) {
  try {
    const deletedTicketTranscript =
      await TicketTranscriptModel.findByIdAndDelete(id);

    if (!deletedTicketTranscript)
      throw new Error("Ticket Transcript not found or already deleted");
    console.log(`Ticket Transcript: ${deletedTicketTranscript}`);
    return deletedTicketTranscript;
  } catch (error) {
    console.error(`Error deleting Ticket Transcript: ${error}`);
    return;
  }
}
