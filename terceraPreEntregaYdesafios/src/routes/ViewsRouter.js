import BaseRouter from "./BaseRouter.js";
import viewsController from "../controllers/views.controller.js";
class ViewsRouter extends BaseRouter {
  init() {
    this.get("/register", ["NO_AUTH"], viewsController.register);

    this.get("/login", ["NO_AUTH"], viewsController.login);

    this.get("/profile", ["AUTH"], viewsController.profile);
    this.get("/", ["PUBLIC"], async (req, res) => {
      return res.render("home");
    });

    this.get("/products", ["PUBLIC"], viewsController.products);

    // this.get("/realTimeProducts", ["ADMIN"],viewsController.realTimeProducts);

<<<<<<< HEAD
    this.get("/chat", ["AUTH"], viewsController.chat);
=======
    this.get("/chat", ["PUBLIC"], viewsController.chat);
>>>>>>> 233066b2ca93f4f6fd10eb0d23bb50410cba7be6

    this.get("/cart", ["AUTH"], viewsController.cart);
    this.get("/purchase", ["AUTH"], viewsController.purchase);
    this.get("/password-restore", ["PUBLIC"], viewsController.passwordRestore);
  }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();
