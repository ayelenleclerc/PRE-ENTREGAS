export default class ChatRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getMessages = () => {
    return this.dao.getMessages();
  };
  createMessage = (message) => {
    return this.dao.createMessage(message);
  };
}
