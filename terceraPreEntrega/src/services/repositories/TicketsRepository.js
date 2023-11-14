export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getTickets = (params) => {
    return this.dao.getTickets(params);
  };

  getTicketsByCart = (params) => {
    return this.dao.getTicketsByCart(params);
  };
  createTicket = (ticket) => {
    return this.dao.createTicket(ticket);
  };
  updateTicket = (id, ticket) => {
    return this, dao.updateTicket(id, ticket);
  };
  deleteTicket = (id) => {
    return this, dao.deleteTicket(id);
  };
}
