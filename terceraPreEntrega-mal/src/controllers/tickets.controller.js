import { ticketsService } from "../services/index.js";

const getTicketsBy = async (req, res) => {
  const { cid } = req.params;
  const allTickets = await ticketsService.getTickets();
  let ticketsToCart = [];
  allTickets.forEach((ticket) => {
    if (ticket.cart == cid) {
      ticketsToCart.push(ticket);
    }
  });
  const ticket = ticketsToCart.at(-1);

  return res.send({
    status: "success",
    message: "Tickets retrieved successfully",
    payload: ticket,
  });
};
const createTicket = async (req, res) => {
  const { code, purchase_datetime, purchaser, amount, cart } = req.body;
  const newTicket = {
    code,
    purchase_datetime,
    purchaser,
    amount,
    cart,
  };

  await ticketsService.createTicket(newTicket);

  return res.send({
    status: "success",
    message: "Ticket created successfully",
    payload: newTicket,
  });
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { code, purchase_datetime, purchaser, amount, cart } = req.body;
  const updatedTicket = {
    code,
    purchase_datetime,
    purchaser,
    amount,
    cart,
    active: false,
  };
};
export default {
  createTicket,
  getTicketsBy,
  updateTicket,
};
