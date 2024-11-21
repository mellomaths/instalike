export class Settings {
  readonly port: number;
  readonly database: { url: string; name: string };
  readonly environment: string;

  constructor() {
    this.port = parseInt(process.env.PORT as string);
    this.database = {
      url: process.env.DATABASE_URL as string,
      name: process.env.DATABASE_NAME as string,
    };
    this.environment = process.env.ENV as string;
  }

  isProduction(): boolean {
    return this.environment === "production";
  }
}
