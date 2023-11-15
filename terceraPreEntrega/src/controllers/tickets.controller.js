import { ticketsService, cartsService } from "../services/index.js";

const getTicketsByCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.getCartById({ _id: cid });
  if (!cart) {
    return res.status(404).send({
      status: "error",
      message: "Cart not found",
    });
  }
  const tickets = await ticketsService.getTicketsByCart({ cart });
  return res.send({
    status: "success",
    message: "Tickets retrieved successfully",
    payload: tickets,
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

export default {
  createTicket,
  getTicketsByCart,
};
