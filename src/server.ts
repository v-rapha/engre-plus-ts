import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import { connection } from './database/connection';

export class SetupServer {
  public express;

  constructor(private port = 3000) {
    this.express = express();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupRoutes();
    await this.databaseSetup();
  }

  public async close(): Promise<void> {
    await connection.close();
  }

  private setupExpress(): void {
    this.express.use(express.json());
  }

  private async databaseSetup(): Promise<void> {
    await connection.connect();
  }

  private setupRoutes(): void {
    this.express.use(routes);
  }
}
