import CheckContactOpenTickets from "../../helpers/CheckContactOpenTickets";
import SetTicketMessagesAsRead from "../../helpers/SetTicketMessagesAsRead";
import { getIO } from "../../libs/socket";
import Log from "../../models/Log";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
// import SendWhatsAppMessage from "../WbotServices/SendWhatsAppMessage";
// import ShowWhatsAppService from "../WhatsappService/ShowWhatsAppService";
import ShowTicketService from "./ShowTicketService";

interface TicketData {
  status?: string;
  userId?: number;
  queueId?: number;
  whatsappId?: number;
}

interface Request {
  ticketData: TicketData;
  ticketId: string | number;
  authorId: number;
}

interface Response {
  ticket: Ticket;
  oldStatus: string;
  oldUserId: number | undefined;
}

const UpdateTicketService = async ({
  ticketData,
  ticketId,
  authorId
}: Request): Promise<Response> => {
  const { status, userId, queueId, whatsappId } = ticketData;
  const newResponsable = await User.findByPk(userId);

  const ticket = await ShowTicketService(ticketId);
  await SetTicketMessagesAsRead(ticket);

  if (whatsappId && ticket.whatsappId !== whatsappId) {
    await CheckContactOpenTickets(ticket.contactId, whatsappId);
  }

  const oldStatus = ticket.status;
  const oldUserId = ticket.user?.id;

  if (oldStatus === "closed") {
    await CheckContactOpenTickets(ticket.contact.id, ticket.whatsappId);
  }

  await ticket.update({
    status,
    queueId,
    userId
  });

  if (userId && newResponsable && newResponsable.id !== oldUserId) {
    await Log.create({
      description: `Ticket ${ticket.contact.name} atribuido para ${newResponsable.name}`,
      authorId
    });
  }

  if (status === "open" && oldStatus === "closed") {
    await Log.create({
      description: `Ticket ${ticket.contact.name} reaberto`,
      authorId
    });
  }

  if (status === "open" && oldStatus === "paused") {
    await Log.create({
      description: `Ticket ${ticket.contact.name} despausado`,
      authorId
    });
  }

  if (status === "open" && oldStatus === "pending") {
    await Log.create({
      description: `Ticket ${ticket.contact.name} aceito`,
      authorId
    });
  }

  if (status === "paused") {
    await Log.create({
      description: `Ticket ${ticket.contact.name} pausado`,
      authorId
    });
  }

  if (status === "closed") {
    await Log.create({
      description: `Ticket ${ticket.contact.name} resolvido`,
      authorId
    });
  }

  if (status === "pending") {
    await Log.create({
      description: `Ticket ${ticket.contact.name} marcado como pendente`,
      authorId
    });
  }

  if (whatsappId) {
    await ticket.update({
      whatsappId
    });
  }

  await ticket.reload();

  const io = getIO();

  if (ticket.status !== oldStatus || ticket.user?.id !== oldUserId) {
    io.to(oldStatus).emit("ticket", {
      action: "delete",
      ticketId: ticket.id
    });
  }

  io.to(ticket.status)
    .to("notification")
    .to(ticketId.toString())
    .emit("ticket", {
      action: "update",
      ticket
    });

  return { ticket, oldStatus, oldUserId };
};

export default UpdateTicketService;
