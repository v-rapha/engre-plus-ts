import express from 'express';
import routes from './routes';

export class SetupServer {
  public express;

  constructor(port = 3000) {
    this.express = express();
  }

  public init(): void {
    this.setupExpress();
    this.setupRoutes();
  }

  private setupExpress(): void {
    this.express.use(express.json());
  }

  private setupRoutes(): void {
    this.express.use(routes);
  }
}
