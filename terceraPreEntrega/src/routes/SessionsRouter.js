import jwt from "jsonwebtoken";
import passportCall from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import config from "../config/config.js";

class SessionsRouter extends BaseRouter {
  init() {
    this.post(
      "/register",
      ["NO_AUTH"],
      passportCall("register", { strategyType: "LOCALS" }),
      async (req, res) => {
        res.clearCookie("cart");
        return res.sendSuccess("Registered");
      }
    );
    this.post(
      "/login",
      ["NO_AUTH"],
      passportCall("login", { strategyType: "LOCALS" }),
      async (req, res) => {
        const tokenizedUser = {
          name: `${req.user.firstName} ${req.user.lastName}`,
          id: req.user._id,
          role: req.user.role,
          cart: req.user.cart,
          email: req.user.email,
        };
        const token = jwt.sign(tokenizedUser, config.jwt.SECRET, {
          expiresIn: "1d",
        });
        res.cookie(config.jwt.COOKIE, token);
        res.clearCookie("cart");
        return res.sendSuccess("Logged In");
      }
    );
    this.get("/logout", ["AUTH"], async (req, res) => {
      res.clearCookie(config.jwt.COOKIE);
      return res.sendSuccess("Logged Out");
    });

    this.get("/current", ["AUTH"], async (req, res) => {
      return res.sendSuccessWithPayload(req.user);
    });
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
