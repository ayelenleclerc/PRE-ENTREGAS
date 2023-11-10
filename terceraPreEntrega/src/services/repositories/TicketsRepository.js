export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getTickets = () => {
    return this.dao.getTickets();
  };

  getTicketById = () => {
    return this.dao.getTicketById(params);
  };
  createTicket = () => {
    return this, dao.createTicket();
  };
  updateTicket = () => {
    return this, dao.updateTicket(id, ticket);
  };
  deleteTicket = () => {
    return this, dao.deleteTicket(id);
  };
}
