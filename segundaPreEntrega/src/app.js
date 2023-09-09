import express from "express";
import mongoose from "mongoose";
import { __dirname } from "./utils.js";
import URI from "./dao/dbConfig.js";
import handlebars from "express-handlebars";
import CartsManager from "./dao/managers/cartManager.js";
import ProductManager from "./dao/managers/productManager.js";
import { Server } from "socket.io";
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

const connection = URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const socketServer = new Server(httpServer);

const prodManager = new ProductManager();

socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado con id: ", socket.id);

  const listProducts = await prodManager.getProducts();
  socketServer.emit("sendProducts", listProducts);

  socket.on("addProduct", async (obj) => {
    await prodManager.addProduct(obj);
    const listProducts = await prodManager.getProducts({});
    socketServer.emit("sendProducts", listProducts);
  });

  socket.on("deleteProduct", async (id) => {
    await prodManager.deleteProduct(id);
    const listProducts = await prodManager.getProducts({});
    socketServer.emit("sendProducts", listProducts);
  });
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  socket.on("newUser", (usuario) => {
    console.log("usuario", usuario);
    socket.broadcast.emit("broadcast", usuario);
  });
  socket.on("disconnect", () => {
    console.log(`Usuario con ID : ${socket.id} esta desconectado `);
  });
});
