import { MongoClient, Db } from "mongodb";
import { DatabaseConfig } from "./DatabaseConfig";

export class MongoConfig implements DatabaseConfig {
  private client: MongoClient | null = null;
  private database: Db | null = null;

  constructor(private readonly url: string, private readonly dbName: string) {}

  async connect(): Promise<void> {
    if (this.client) {
      return;
    }

    this.client = new MongoClient(this.url);
    await this.client.connect();
  }

  getCollection(collectionName: string) {
    if (!this.client) {
      throw new Error("Client is not connected");
    }

    this.database = this.client.db(this.dbName);
    return this.database.collection(collectionName);
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
  }
}
