import jwt from "jsonwebtoken";
import passportCall from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import config from "../config/config.js";
import { validateJWT } from "../middlewares/jwtExtractor.js";
import authService from "../services/authService.js";
import __dirname__ from "../utils.js";
import MailingService from "../services/MailingService.js";

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
    this.get(
      "/google",
      ["NO_AUTH"],
      passportCall("google", {
        scope: ["profile", "email"],
        strategyType: "GOOGLE",
      }),
      async (req, res) => {}
    );

    this.get(
      "/googlecallback",
      ["NO_AUTH"],
      passportCall("google", { strategyType: "OAUTH" }),
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
          console.error("Error in Google callback:", error);
          return res.sendError("An error occurred during login");
        }
      }
    );

    this.post("/loginJWT", validateJWT, async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete values" });
      const user = await usersService.getUserBy({ email });
      if (!user)
        return res
          .status(400)
          .send({ status: "error", error: "Incorrect Credentials" });
      const isValidPassword = await authService.validatePassword(
        password,
        user.password
      );
      if (!isValidPassword)
        return res
          .status(400)
          .send({ status: "error", error: "Invalid Credentials" });
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.firstName,
        },
        config.jwt.SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie(config.jwt.COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 86400000,
      });
      return res.sendSuccess("Logged In", token);
    });

    this.get("/profileInfo", validateJWT, async (req, res) => {
      res.send({ status: "success", payload: req.user });
    });

    this.get("/authFail", (req, res) => {
      req.logger.error(
        `[${new Date().toISOString()}] Error: Hubo un fallo en la autenticacion del usuario`
      );
      res.status(401).send({ status: "error" });
    });
    this.get("/mails", ["AUTH"], async (req, res) => {
      const mailService = new MailingService();

      const mailRequest = {
        from: "La tienda <ayelenleclerc@gmail.com>",
        to: " ayelenleclerc@gmail.com",
        subject: "Probando NodeMailer",
        html: `
                <div>
                    <h1>Compra realizada</h1>
                    <br/>
                    <p>Esto es una prueba</p>
                    <br/>
                    <img src="cid:mailing"/>
                    </div>
      `,
        attachments: [
          {
            filename: "gmail.jpg",
            path: `./src/public/img/gmail.jpg`,
            cid: "mailing",
          },
        ],
      };

      const mailResult = await mailService.sendMail(mailRequest);
      console.log(mailResult);
      return res.send({
        status: "success",
        message: "Mail sent",
        payload: mailResult,
      });
    });
    this.get("/twilio", ["AUTH"], async (req, res) => {
      const result = await twilioClient.messages.create({
        from: TWILIO_TEST_NUMBER,
        to: "+5491133749360",
        body: "Hola, SMS de prueba",
      });
      console.log(result);
      res.sendStatus(200);
    });
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
