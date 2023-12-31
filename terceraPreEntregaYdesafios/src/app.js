import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "express-compression";
// import cluster from "cluster";
// import os from "os";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express";

import productsRouter from "./routes/ProductsRouter.js";
import cartsRouter from "./routes/CartRouter.js";
import viewsRouter from "./routes/ViewsRouter.js";
import SessionsRouter from "./routes/SessionsRouter.js";
import dictionaryRouter from "./routes/dictionary.router.js";

import __dirname from "./utils.js";
import config from "./config/config.js";
import initializePassportStrategies from "./config/passport.config.js";
import ErrorHandler from "./middlewares/errorHandler.js";
import { chatService } from "./services/index.js";
import attachLogger from "./middlewares/attachLogger.js";

//no entendi que parte del codigo va dentro del el cluster principal y los workers
const app = express();

const PORT = process.env.PORT || 8080;

const connection = mongoose.connect(config.mongo.URL);
console.log("Base de datos conectada");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(cors({ origin: ["http://localhost:8080"], credentials: true }));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachLogger);

initializePassportStrategies();

//rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", SessionsRouter);
app.use("/api/dictionary", dictionaryRouter);

app.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

app.use((req, res, next) => {
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
});

app.use("/loggerTest", attachLogger, async (req, res, next) => {
  req.logger.log("debug", "prueba logger");
  req.logger.log("http", "prueba logger");
  req.logger.log("info", "prueba logger");
  req.logger.log("error", "prueba logger");
  req.logger.log("fatal", "prueba logger");
  res.sendStatus(200);
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "La Tienda docs",
      version: "1.0.0",
      description: "Aplicación para  E-commerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yml`],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(
  "/apidocs",
  swaggerUIExpress.serve,
  swaggerUIExpress.setup(swaggerSpec)
);

app.use((error, req, res, next) => {
  ErrorHandler(error, req, res, next);
  res.status(500).send({
    status: "error",
    message: "Error interno del servidor",
  });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado con id: ", socket.id);

  //   const listProducts = await prodManager.getProducts();
  //   socketServer.emit("sendProducts", listProducts);

  //   socket.on("addProduct", async (obj) => {
  //     await prodManager.addProduct(obj);
  //     const listProducts = await prodManager.getProducts({});
  //     socketServer.emit("sendProducts", listProducts);
  //   });

  //   socket.on("deleteProduct", async (id) => {
  //     await prodManager.deleteProduct(id);
  //     const listProducts = await prodManager.getProducts({});
  //     socketServer.emit("sendProducts", listProducts);
  //   });

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

  socket.on("message", async (info) => {
    // Guardar el mensaje utilizando el MessagesManager
    console.log(info);
    await chatManager.createMessage(info);
    // Emitir el mensaje a todos los clientes conectados
    socketServer.emit("chat", await chatService.getMessages());
  });
});
