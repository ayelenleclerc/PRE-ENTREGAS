import CartsService from "./CartsService.js";
import ProductsService from "./ProductsService.js";
import UsersService from "./UsersService.js";
import TicketService from "./TicketsService.js";

import CartManager from "../dao/mongo/managers/cartManager.js";
import ProductManager from "../dao/mongo/managers/productManager.js";
import UserManager from "../dao/mongo/managers/userManager.js";
import TicketManager from "../dao/mongo/managers/ticketManager.js";

export const cartsService = new CartsService(new CartManager());
export const productsService = new ProductsService(new ProductManager());

export const ticketsService = new TicketService(new TicketManager());
export const usersService = new UsersService(new UserManager());
