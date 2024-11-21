export interface FileHandler {
  saveFile(path: string, data: Buffer): Promise<void>;
}
