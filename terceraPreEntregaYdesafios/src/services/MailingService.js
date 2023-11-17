const GMAIL_USER = "EMAIL MAILER";
const GMAIL_PASSWORD = "PASSWORD MAILER";

export default class MailingService {
  constructor() {
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
    const result = await transport.sendMail(mailRequest);
    return result;
  };
}
