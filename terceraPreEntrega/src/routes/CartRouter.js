import BaseRouter from "./BaseRouter.js";
import cartsController from "../controllers/carts.controller.js";
import ticketsController from "../controllers/tickets.controller.js";

class CartRouter extends BaseRouter {
  init() {
    this.get("/:cid", ["USER"], cartsController.getCartById);

    this.get("/:cid/purchase", ["USER"], ticketsController.getTicketsByCart);

    this.post("/:cid/purchase", ["USER"], ticketsController.createTicket);

    this.post("/", ["USER"], cartsController.createCart);

    this.put(":cid/products/:pid", ["NO_AUTH"], cartsController.addProduct);

    this.put("/products/:pid", ["USER"], cartsController.addProduct);

    this.delete("/:cid", ["ADMIN"], cartsController.deleteCart);
  }
}
const cartsRouter = new CartRouter();

export default cartsRouter.getRouter();
