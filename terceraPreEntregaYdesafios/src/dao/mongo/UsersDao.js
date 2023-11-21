import userModel from "./models/user.model.js";

export default class UsersDao {
  getUsers = (params) => {
    return userModel.find(params).lean();
  };
  getUserBy = (params) => {
    return userModel.findOne(params).lean();
  };
  createUser = async (user) => {
    const result = await userModel.create(user);
    return result.toObject();
  };
  updateUser = (id, user) => {
    return userModel.updateOne({ _id: id }, { $set: user });
  };
  deleteUser = (id) => {
    return userModel.updateOne({ _id: id }, { $set: { activate: false } });
  };
}
