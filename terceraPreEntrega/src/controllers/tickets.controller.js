import { ticketsService } from "../services/index.js";

<<<<<<< HEAD
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
=======
const getTickets = async (req, res) => {
  const result = await ticketsService.getTickets();
  return res.send({ status: "success", payload: result });
};

const getTicketById = async (req, res) => {
  const { tid } = req.params;
  const ticket = await ticketsService.getTicketById(tid);
  if (!ticket)
    return res
      .status(404)
      .send({ status: "error", message: "Ticket not found" });
  return res.send({ status: "success", payload: ticket });
}
const createTicket = async (req, res) => {
  
  const newTicket = {
    code, 
    purchase_datetime,
    purchaser: req.user.email,
    amount
  }
  const result = await ticketsService.createTicket(newTicket);
  return res.send({ status: "success", payload: result });
>>>>>>> 44a531d027aed8b2da3a9bc9cf927180f8c9d19e
};

export default {
  createTicket,
  getTicketsByCart,
};
