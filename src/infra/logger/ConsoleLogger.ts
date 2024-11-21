import { Logger } from "./Logger";

export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`${new Date().toISOString()} [LOG] ${message}`);
  }
  info(message: string): void {
    console.log(`${new Date().toISOString()} [INFO] ${message}`);
  }
  error(message: string): void {
    console.error(`${new Date().toISOString()} [ERROR] ${message}`);
  }
  debug(message: string): void {
    console.debug(`${new Date().toISOString()} [DEBUG] ${message}`);
  }
}
