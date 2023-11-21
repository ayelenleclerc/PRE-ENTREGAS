import {
  productsService,
  cartsService,
  ticketsService,
} from "../services/index.js";

import { getValidFilters } from "../utils.js";

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

export default {
  register,
  login,
  profile,
  products,
  realTimeProducts,
  chat,
  cart,
  purchase,
};
