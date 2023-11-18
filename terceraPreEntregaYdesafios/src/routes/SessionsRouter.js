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

    this.get(
      "/github",
      ["NO_AUTH"],
      passportCall("github", { strategyType: "GITHUB" }),
      async (req, res) => {}
    );
    this.get(
      "/githubcallback",
      ["NO_AUTH"],
      passportCall("github", { strategyType: "GITHUB" }),
      async (req, res) => {
        try {
          const { firstName, lastName, _id, role, cart, email } = req.user;

          const tokenizedUser = {
            name: `${firstName} ${lastName}`,
            id: _id,
            role: role,
            cart: cart,
            email: email,
          };

          const token = jwt.sign(tokenizedUser, config.jwt.SECRET, {
            expiresIn: "1d",
          });

          res.cookie(config.jwt.COOKIE, token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 86400000,
          });

          res.clearCookie("cart");

          return res.redirect("/profile");
        } catch (error) {
          console.error("Error in GitHub callback:", error);
          return res.sendError("An error occurred during login");
        }
      }
    );
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
