import { Client } from "minio";
import { ObjectStorage } from "./ObjectStorage";
import { Inject } from "../di/DependencyInjection";
import { Settings } from "../settings/Settings";

export class MinioAdapter implements ObjectStorage {
  @Inject("Settings")
  settings?: Settings;

  private client: Client;

  constructor() {
    this.client = new Client({
      endPoint: this.settings?.objectStorage.endpoint as string,
      port: this.settings?.objectStorage.port as number,
      useSSL: this.settings?.objectStorage.useSSL as boolean,
      accessKey: this.settings?.objectStorage.accessKey as string,
      secretKey: this.settings?.objectStorage.secretKey as string,
    });
  }

  connect(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async put(bucket: string, key: string, filePath: string): Promise<string> {
    const exists = await this.client.bucketExists(bucket);
    if (!exists) {
      await this.client.makeBucket(bucket);
    }

    await this.client.fPutObject(bucket, key, filePath);
    const url = await this.client.presignedPutObject(bucket, key);
    return url.split("?")[0];
  }

  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
