import { usersService } from "../services/index.js";
import ErrorsDictionary from "../dictionaries/errors.js";
import errorCodes from "../dictionaries/errorCodes.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    return res.send({ status: "success", payload: users });
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};
const getUserBy = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserBy({ _id: uid });
    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    return res.send({ status: "success", payload: user });
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};
const createUser = async (req, res, next) => {
  try {
    const result = await usersService.createUser();
    return res.send({ status: "success", payload: result._id });
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserBy({ _id: uid });
    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    const result = await usersService.updateUser(uid, req.body);
    return res.send({ status: "success", payload: result });
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserBy({ _id: uid });
    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    await usersService.deleteUser(uid);
    return res.send({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};

export default {
  getUsers,
  getUserBy,
  createUser,
  updateUser,
  deleteUser,
};
