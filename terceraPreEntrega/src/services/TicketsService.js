export default class TicketService {
  constructor(manager) {
    this.manager = manager;
  }
  getTickets = () => {
    return this.manager.getTickets();
  };

  getTicketById = () => {
    return this.manager.getTicketById(params);
  };
  createTicket = () => {
    return this, manager.createTicket();
  };
  updateTicket = () => {
    return this, manager.updateTicket(id, ticket);
  };
  deleteTicket = () => {
    return this, manager.deleteTicket(id);
  };
}
