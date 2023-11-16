import chatModel from "./models/chat.model.js";

export default class ChatDao {
  getMessages = async () => {
    try {
      return await chatModel.find().lean();
    } catch (error) {
      return error;
    }
  };

  createMessage = async (message) => {
    try {
      return await chatModel.create(message);
    } catch (error) {
      return error;
    }
  };
}
