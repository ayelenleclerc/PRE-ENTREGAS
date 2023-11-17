import { usersService } from "../services/index.js";

const getUsers = async (req, res) => {
  const users = await usersService.getUsers();
  return res.send({ status: "success", payload: users });
};
const getUserBy = async (req, res) => {
  const { uid } = req.params;
  const user = await usersService.getUserBy({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", message: "User not found" });
  return res.send({ status: "success", payload: user });
};
const createUser = async (req, res) => {
  const result = await usersService.createUser();
  return res.send({ status: "success", payload: result._id });
};
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const user = await usersService.getUserBy({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", message: "User not found" });
  const result = await usersService.updateUser(uid, req.body);
  return res.send({ status: "success", payload: result });
};
const deleteUser = async (req, res) => {
  const { uid } = req.params;
  const user = await usersService.getUserBy({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", message: "User not found" });
  await usersService.deleteUser(uid);
  return res.send({ status: "success", message: "User deleted successfully" });
};

export default {
  getUsers,
  getUserBy,
  createUser,
  updateUser,
  deleteUser,
};
