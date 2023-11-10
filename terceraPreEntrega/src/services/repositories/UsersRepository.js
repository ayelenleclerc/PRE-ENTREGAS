export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUsers = () => {
    return this.dao.getUsers(params);
  };
  getUserBy = () => {
    return this.dao.getUserBy(params);
  };
  createUser = () => {
    return this.dao.createUser(user);
  };
  updateUser = () => {
    return this.dao.updateUser(id, user);
  };
  deleteUser = () => {
    return this.dao.deleteUser(id);
  };
}
