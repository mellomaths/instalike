import winston from "winston";
import { Logger } from "./Logger";

export class WinstonLogger implements Logger {
  logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  log(message: string): void {
    this.logger.log("info", message);
  }

  info(message: string): void {
    this.logger.info("info", message);
  }

  error(message: string): void {
    this.logger.error("error", message);
  }

  debug(message: string): void {
    this.logger.debug("debug", message);
  }
}
