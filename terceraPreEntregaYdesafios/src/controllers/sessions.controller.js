import jwt from "jsonwebtoken";
import __dirname__ from "../utils.js";
import MailerService from "../services/MailerService.js";
import TwilioService from "../services/TwilioService.js";
import ErrorsDictionary from "../dictionary/errors.js";
import errorCodes from "../dictionary/errorCodes.js";
import { usersService } from "../services/index.js";

import config from "../config/config.js";
import DMailTemplates from "../constants/DMailTemplates.js";

const register = async (req, res) => {
  try {
    const mailerService = new MailerService();
    const result = await mailerService.sendMail(
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
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(customError);
    } else {
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(error);
    }
  }
  res.clearCookie("cart");
  return res.sendSuccess("Registered");
};

const login = async (req, res) => {
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
};

const logout = async (req, res) => {
  res.clearCookie(config.jwt.COOKIE);
  return res.sendSuccess("Logged Out");
};

const current = async (req, res) => {
  return res.sendSuccessWithPayload(req.user);
};

const applyGithubCallback = async (req, res) => {
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
};

const applyGoogleCallback = async (req, res) => {
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
};

const mailing = async (req, res) => {
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
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(customError);
    } else {
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(error);
    }
  }
};

const twilio = async (req, res) => {
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
};

const loginJWT = async (req, res) => {
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
};

const passwordRestoreRequest = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.getUserBy({ email });
  if (!user) return res.sendBadRequest("User doesn't exist ");
  const mailerService = new MailerService();
  const result = await mailerService.sendMail(
    [email],
    DMailTemplates.PASSWORD_RESTORE,
    {}
  );

  res.sendSuccess("Email sent");
};

export default {
  register,
  login,
  logout,
  current,
  applyGithubCallback,
  applyGoogleCallback,
  mailing,
  twilio,
  loginJWT,
  passwordRestoreRequest,
};
