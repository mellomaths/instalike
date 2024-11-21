export interface DatabaseConnection {
  connect(): Promise<void>;
  getConnection(): any;
  close(): Promise<void>;
}
