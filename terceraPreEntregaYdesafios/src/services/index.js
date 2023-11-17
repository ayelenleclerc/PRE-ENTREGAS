import CartsRepository from "./repositories/CartsRepository.js";
import ProductsRepository from "./repositories/ProductsRepository.js";
import UsersRepository from "./repositories/UsersRepository.js";
import TicketRepository from "./repositories/TicketsRepository.js";
import ChatRepository from "./repositories/ChatRepository.js";

import PersistenceFactory from "../dao/PersistenceFactory.js";

const { CartsDao, ProductsDao, TicketsDao, UsersDao, ChatDao } =
  await PersistenceFactory.getPersistence();

export const cartsService = new CartsRepository(new CartsDao());
export const productsService = new ProductsRepository(new ProductsDao());
export const ticketsService = new TicketRepository(new TicketsDao());
export const usersService = new UsersRepository(new UsersDao());
export const chatService = new ChatRepository(new ChatDao());
