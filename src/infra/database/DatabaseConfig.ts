export interface DatabaseConfig {
  connect(): Promise<void>;
  close(): Promise<void>;
}
