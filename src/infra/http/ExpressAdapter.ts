import express, { Express, Request, Response } from "express";
import cors from "cors";
import { HttpServer } from "./HttpServer";
import { WinstonLogger } from "../logger/WinstonLogger";
import { ApplicationException } from "../exception/ApplicationException";
import { Settings } from "../settings/Settings";

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: Request, res: Response) {
      const logger = new WinstonLogger();
      const settings = new Settings();
      try {
        const output = await callback(req.params, req.body);
        if (method === "delete") {
          return res.status(204).json(output);
        }
        if (method === "post") {
          return res.status(201).json(output);
        }
        res.json(output);
      } catch (error: any) {
        if (error instanceof ApplicationException) {
          return res.status(error.status).json(error.payload);
        }

        logger.error(error);
        let output = { message: "Internal server error", error: null };
        if (!settings.isProduction()) {
          output = { ...output, error: error.message };
        }
        res.status(500).json(output);
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`ExpressAdapter:: HTTP server is running on port ${port}`);
    });
  }
}
