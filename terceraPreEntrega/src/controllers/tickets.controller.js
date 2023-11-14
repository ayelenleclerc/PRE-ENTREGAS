import { ticketsService } from "../services/index.js";

const getTicketsByCart = async (req, res) => {
  const { cid } = req.user.cart;
  const tickets = await ticketsService.getTicketsByCart({ _id: cid });
  res.send({ status: "success", payload: tickets });
};
const createTicket = async (req, res) => {
  const { code, purchase_datetime, purchaser, amount } = req.body;
  const newTicket = {
    code,
    purchase_datetime,
    purchaser,
    amount,
  };
  console.log(newTicket);
  await ticketsService.createTicket(newTicket);

  return res.send({
    status: "success",
    message: "Ticket created successfully",
  });
};

export default {
  createTicket,
  getTicketsByCart,
};
