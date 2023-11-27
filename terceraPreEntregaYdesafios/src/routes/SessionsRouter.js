import sessionsController from "../controllers/sessions.controller.js";
import BaseRouter from "./BaseRouter.js";
<<<<<<< HEAD
import config from "../config/config.js";
=======
import passportCall from "../middlewares/passportCall.js";
>>>>>>> 233066b2ca93f4f6fd10eb0d23bb50410cba7be6

import __dirname__ from "../utils.js";
import MailerService from "../services/MailerService.js";
import TwilioService from "../services/TwilioService.js";
import ErrorsDictionary from "../dictionary/errors.js";
import errorCodes from "../dictionary/errorCodes.js";
import { usersService } from "../services/index.js";
import authService from "../services/authService.js";
import DMailTemplates from "../constants/DMailTemplates.js";
class SessionsRouter extends BaseRouter {
  init() {
    this.post(
      "/register",
      ["PUBLIC"],
      passportCall(
        "register",
        { strategyType: "LOCALS" },
        sessionsController.register
      )
    );
    this.post(
      "/login",
      ["PUBLIC"],
      passportCall(
        "login",
        { strategyType: "LOCALS" },
        sessionsController.login
      )
    );
    this.get("/logout", ["AUTH"], sessionsController.logout);

    this.get("/current", ["AUTH"], sessionsController.current);

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
<<<<<<< HEAD
      async (req, res) => {
        try {
          const { firstName, lastName, _id, role, cart, email } = req.user;
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
=======
      sessionsController.applyGithubCallback
>>>>>>> 233066b2ca93f4f6fd10eb0d23bb50410cba7be6
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
<<<<<<< HEAD
      passportCall("google", { strategyType: "OAUTH" }, async (req, res) => {
        try {
          const { firstName, lastName, _id, role, cart, email } = req.user;
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
      })
=======
      passportCall(
        "google",
        { strategyType: "OAUTH" },
        sessionsController.applyGoogleCallback
      )
>>>>>>> 233066b2ca93f4f6fd10eb0d23bb50410cba7be6
    );

    // this.post("/loginJWT", validateJWT,sessionsController.loginJWT);

    // this.get("/profileInfo", validateJWT, async (req, res) => {
    //   res.send({ status: "success", payload: req.user });
    // });

    this.get("/authFail", async (req, res) => {
      req.logger.error(
        `[${new Date().toISOString()}] Error: Hubo un fallo en la autenticacion del usuario`
      );
      res.status(401).send({ status: "error" });
    });
<<<<<<< HEAD

    this.get("/mails", ["AUTH"], async (req, res) => {
      try {
        //Enviar un correo de bienvenida
        const mailService = new MailerService();
        const result = await mailService.sendMail(
          [req.user.email],
          DMailTemplates.WELCOME,
          { user: req.user }
        );
      } catch (error) {
        const customError = new Error();
        const knownError = ErrorsDictionary[error.name];

        if (knownError) {
          customError.name = knownError;
          customError.message = error.message;
          customError.code = errorCodes[knownError];
          req.logger.error(
            `[${new Date().toISOString()}] Error: ${error.message}`
          );
          next(customError);
        } else {
          req.logger.error(
            `[${new Date().toISOString()}] Error: ${error.message}`
          );
          next(error);
        }
      }
    });

    this.get("/twilio", ["AUTH"], async (req, res) => {
      const twilioService = new TwilioService();

      const twilioResult = twilioService.sendSMS(
        "5491133749360",
        "Un mensaje de prueba"
      );
      console.log(twilioResult);
      return res.send({
        status: "success",
        message: "SMS sent",
        payload: twilioResult,
      });
    });

    this.post("/passwordRestoreRequest", ["PUBLIC"], async (req, res) => {
      const { email } = req.body;
      const user = await usersService.getUserBy({ email });
      if (!user) return res.sendBadRequest("User doesn't exist ");
      const token = jwt.sign({ email }, config.jwt.SECRET, {
        expiresIn: "1d",
      });
      const mailerService = new MailerService();
      const result = await mailerService.sendMail(
        [email],
        DMailTemplates.PWD_RESTORE,
        { token }
      );
      res.sendSuccess("Email sent");
    });
    this.put("/password-restore", ["PUBLIC"], async (req, res) => {
      const { newPassword, token } = req.body;
      if (!newPassword || !token)
        return res.sendBadRequest("Incomplete values");
      try {
        //El token es válido?
        const { email } = jwt.verify(token, config.jwt.SECRET);
        //El usuario sí está en la base?
        const user = await usersService.getUserBy({ email });
        if (!user) return res.sendBadRequest("User doesn't exist");
        //¿No será la misma contraseña que ya tiene?
        const isSamePassword = await authService.validatePassword(
          newPassword,
          user.password
        );
        if (isSamePassword)
          return res.sendBadRequest(
            "New Password Cannot be equal to Old Password"
          );
        //Hashear mi nuevo password
        const hashNewPassword = await authService.createHash(newPassword);
        await usersService.updateUser(user._id, { password: hashNewPassword });
        res.sendSuccess();
      } catch (error) {
        console.log(error);
        res.sendBadRequest("Invalid token");
      }
    });
=======

    this.get("/mails", ["AUTH"], sessionsController.mailing);

    this.get("/twilio", ["AUTH"], sessionsController.twilio);

    this.post(
      "/passwordRestoreRequest",
      ["PUBLIC"],
      sessionsController.passwordRestoreRequest
    );
    this.put(
      "/password-restore",
      ["PUBLIC"],
      sessionsController.restorePassword
    );
>>>>>>> 233066b2ca93f4f6fd10eb0d23bb50410cba7be6
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
