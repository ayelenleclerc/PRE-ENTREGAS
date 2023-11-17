export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getTickets = (params) => {
    return this.dao.getTickets(params);
  };

  getTicketsBy = (params) => {
    return this.dao.getTicketsBy(params, { populate: true });
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
