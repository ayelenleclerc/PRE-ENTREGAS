import BaseRouter from "./BaseRouter.js";
import cartsController from "../controllers/carts.controller.js";

class CartRouter extends BaseRouter {
  init() {
    this.get("/:cid", ["USER"], cartsController.getCartById);

    this.get("/:cid/purchase", ["USER"], cartsController.purchaseCart);

    this.post("/", ["USER"], cartsController.createCart);

    this.put(":cid/products/:pid", ["NO_AUTH"], cartsController.addProduct);

    this.put("/products/:pid", ["USER"], cartsController.addProduct);

    this.delete("/:cid", ["USER"], cartsController.deleteTotalProduct);

    this.delete("/:cid", ["ADMIN"], cartsController.deleteCart);
  }
}
const cartsRouter = new CartRouter();

export default cartsRouter.getRouter();
