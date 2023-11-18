import nodemailer from "nodemailer";
import config from "../config/config.js";

const GMAIL_USER = config.gmail.USER;
const GMAIL_PASSWORD = config.gmail.PASS;

export default class MailingService {
  constructor(transport) {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD,
      },
    });
  }

  sendMail = async (mailRequest) => {
    const result = await this.transport.sendMail(mailRequest);
    return result;
  };
}
