import express, { Express, Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import { HttpServer } from "./HttpServer";
import { WinstonLogger } from "../logger/WinstonLogger";
import { ApplicationException } from "../exception/ApplicationException";
import { Settings } from "../settings/Settings";

export class ExpressAdapter implements HttpServer {
  app: any;
  upload: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    this.upload = multer({ storage });
  }

  register(
    method: string,
    url: string,
    callback: Function,
    isUpload: boolean = false
  ): void {
    const handler = async (req: Request, res: Response) => {
      const logger = new WinstonLogger();
      const settings = new Settings();
      try {
        const output = await callback(req.params, req.body, req.file);
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
    };

    if (isUpload) {
      this.app[method](url, this.upload.single("file"), handler);
      return;
    }
    this.app[method](url, handler);
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`ExpressAdapter:: HTTP server is running on port ${port}`);
    });
  }
}
