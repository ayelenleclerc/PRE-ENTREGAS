import CartsRepository from "./repositories/CartsRepository.js";
import ProductsRepository from "./repositories/ProductsRepository.js";
import UsersRepository from "./repositories/UsersRepository.js";
import TicketRepository from "./repositories/TicketsRepository.js";
import ChatRepository from "./repositories/ChatRepository.js";

import CartsDao from "../dao/mongo/CartsDao.js";
import ProductsDao from "../dao/mongo/ProductsDao.js";
import UsersDao from "../dao/mongo/UsersDao.js";
import TicketsDao from "../dao/mongo/TicketsDao.js";
import ChatDao from "../dao/mongo/ChatDao.js";

export const cartsService = new CartsRepository(new CartsDao());
export const productsService = new ProductsRepository(new ProductsDao());
export const ticketsService = new TicketRepository(new TicketsDao());
export const usersService = new UsersRepository(new UsersDao());
export const chatService = new ChatRepository(new ChatDao());
