import winston from "winston";

export default class LoggerService {
  constructor(env) {
    this.winston_levels = {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      http: 4,
      debug: 5,
    };
    this.logger = this.createLogger(env);
  }

  createLogger = (env) => {
    switch (env) {
      case "development":
        return winston.createLogger({
          levels: this.winston_levels,
          transports: [
            new winston.transports.Console({ level: "debug" }),
            new winston.transports.File({
              filename: "./errorsDev.log",
              level: "error",
            }),
          ],
        });

      case "production":
        return winston.createLogger({
          levels: this.winston_levels,
          transports: [
            new winston.transports.Console({ level: "info" }),
            new winston.transports.File({
              filename: "./errors.log",
              level: "error",
            }),
          ],
        });
    }
  };
}
