import { Request, Response } from 'express';

export class SalesController {
  public async create(req: Request, res: Response): Promise<void> {
    res.status(201).send({ ...req.body, id: 'fake-id' });
  }
}
