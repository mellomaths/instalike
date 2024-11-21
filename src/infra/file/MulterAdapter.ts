import multer from "multer";
import { FileHandler } from "./FileHandler";

export class MulterAdapter implements FileHandler {
  async saveFile(path: string, data: Buffer): Promise<void> {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ dest: "./uploads", storage });
  }
}
