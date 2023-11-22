import {
  productsService,
  cartsService,
  ticketsService,
} from "../services/index.js";

import { getValidFilters } from "../utils.js";
import config from "../config/config.js";

const register = async (req, res) => {
  return res.render("register");
};

const login = async (req, res) => {
  return res.render("login");
};

const profile = async (req, res) => {
  return res.render("profile");
};

const products = async (req, res) => {
  let { page = 1, limit = 5, sort, order = 1, ...filters } = req.query;
  const cleanFilters = getValidFilters(filters, "product");

  let sortResult = {};
  if (sort) {
    sortResult[sort] = order;
  }
  const pagination = await productsService.paginateProducts(cleanFilters, {
    page,
    lean: true,
    limit,
    sort: sortResult,
  });

  return res.render("productos", {
    products: pagination.docs,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage,
    nextPage: pagination.nextPage,
    prevPage: pagination.prevPage,
    page: pagination.page,
  });
};

const realTimeProducts = async (req, res) => {
  const listaProductos = await productsService.getProducts();
  return res.render("realTimeProducts", { listaProductos });
};

const chat = async (req, res) => {
  return res.render("chat");
};

const cart = async (req, res) => {
  const cart = await cartsService.getCartById(req.user._id);
  return res.render("cart", { cart });
};

const purchase = async (req, res) => {
  const ticket = await ticketsService.getTicketsBy(req.user.cart._id);
  return res.render("purchase", { ticket });
};
const restorePassword = async (req, res) => {
  const { newPassword, token } = req.body;
  if (!newPassword || !token) return res.sendBadRequest("Incomplete values");
  try {
    //El token es válido?
    const { email } = jwt.verify(token, config.jwt.SECRET);
    //El usuario sí está en la base?
    const user = await usersService.getUserBy({ email });
    if (!user) return res.sendBadRequest("User doesn't exist");
    //¿No será la misma contraseña que ya tiene?
    const isSamePassword = await authService.validatePassword(
      newPassword,
      user.password
    );
    if (isSamePassword)
      return res.sendBadRequest("New Password Cannot be equal to Old Password");
    //Hashear mi nuevo password
    const hashNewPassword = await authService.createHash(newPassword);
    await usersService.updateUser(user._id, { password: hashNewPassword });
    res.sendSuccess();
  } catch (error) {
    console.log(error);
    res.sendBadRequest("Invalid token");
  }
};
const passwordRestore = async (req, res) => {
  const { token } = req.query;
  if (!token)
    return res.render("RestorePasswordError", {
      error:
        "Ruta inválida, por favor solicita un nuevo link de restablecimiento",
    });
  try {
    jwt.verify(token, config.jwt.SECRET);
    return res.render("passwordRestore", { token });
  } catch (error) {
    console.log(error);
    console.log(Object.keys(error));
    if (error.expiredAt) {
      return res.render("RestorePasswordError", {
        error:
          "Link expirado, por favor solicita un nuevo link de restablecimiento",
      });
    }
    return res.render("RestorePasswordError", {
      error:
        "Link inválido o corrupto. Por favor solicita un nuevo link de restablecimiento",
    });
  }
};

export default {
  register,
  login,
  profile,
  products,
  realTimeProducts,
  chat,
  cart,
  purchase,
  passwordRestore,
};
