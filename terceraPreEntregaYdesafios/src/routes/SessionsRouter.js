import sessionsController from "../controllers/sessions.controller.js";
import BaseRouter from "./BaseRouter.js";
import passportCall from "../middlewares/passportCall.js";

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
      sessionsController.applyGithubCallback
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
      passportCall(
        "google",
        { strategyType: "OAUTH" },
        sessionsController.applyGoogleCallback
      )
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
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
