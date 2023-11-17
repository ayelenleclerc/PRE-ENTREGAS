import BaseRouter from "./BaseRouter.js";
import {
  productsService,
  cartsService,
  ticketsService,
} from "../services/index.js";

import { getValidFilters } from "../utils.js";

class ViewsRouter extends BaseRouter {
  init() {
    this.get("/register", ["NO_AUTH"], async (req, res) => {
      return res.render("register");
    });

    this.get("/login", ["NO_AUTH"], async (req, res) => {
      return res.render("login");
    });

    this.get("/profile", ["AUTH"], async (req, res) => {
      return res.render("profile");
    });
    this.get("/", ["PUBLIC"], async (req, res) => {
      return res.render("home");
    });

    this.get("/products", ["PUBLIC"], async (req, res) => {
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
    });

    // this.get("/realTimeProducts", ["ADMIN"], async (req, res) => {
    //   const listaProductos = await productsService.getProducts();
    //   return res.render("realTimeProducts", { listaProductos });
    // });
    this.get("/chat", ["PUBLIC"], (req, res) => {
      return res.render("chat");
    });

    this.get("/cart", ["AUTH"], async (req, res) => {
      const cart = await cartsService.getCartById(req.user._id);
      return res.render("cart", { cart });
    });
    this.get("/purchase", ["AUTH"], async (req, res) => {
      const ticket = await ticketsService.getTicketsBy(req.user.cart._id);
      return res.render("purchase", { ticket });
    });
  }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();
