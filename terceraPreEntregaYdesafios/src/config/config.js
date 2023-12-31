// import dotenv from "dotenv";
// import { Command } from "commander";

// const program = new Command();
// program
//   .option("-m, --mode <mode>", "Modo de trabajo", "production")
//   .option("-p <port>", "Puerto del servidor", 8080);

// program.parse();

// dotenv.config({
//   path: program.opts().mode === "dev" ? "./.env.dev" : "./.env.prod",
// });

export default {
  app: {
    PORT: process.env.PORT || 8080,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    PERSISTENCE: process.env.PERSISTENCE || "MONGO",
  },
  mongo: {
    URL: process.env.MONGO_URL || "localhost:27017",
  },
  jwt: {
    COOKIE: process.env.JWT_COOKIE,
    SECRET: process.env.JWT_SECRET,
  },
  mailer: {
    USER: process.env.GMAIL_USER,
    PASS: process.env.GMAIL_PASSWORD,
  },
  github: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
  google: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  twilio: {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TEST_NUMBER: process.env.TWILIO_TEST_NUMBER,
  },
};
