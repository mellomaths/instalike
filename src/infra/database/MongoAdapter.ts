import { MongoClient, Db } from "mongodb";
import { DatabaseConnection } from "./DatabaseConnection";
import { Inject } from "../di/DependencyInjection";
import { Settings } from "../settings/Settings";

export class MongoAdapter implements DatabaseConnection {
  @Inject("Settings")
  settings?: Settings;

  private client: MongoClient | null = null;

  constructor() {
    this.client = new MongoClient(this.settings?.database.url as string);
    this.client.connect();
  }

  async connect(): Promise<void> {
    if (this.client) {
      return;
    }

    this.client = new MongoClient(this.settings?.database.url as string);
    await this.client.connect();
  }

  getConnection() {
    if (!this.client) {
      throw new Error("Client is not connected");
    }
    return this.client?.db(this.settings?.database.name as string);
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
  }
}
