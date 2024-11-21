export interface ObjectStorage {
  put(bucket: string, key: string, filePath: string): Promise<string>;
  close(): Promise<void>;
}
