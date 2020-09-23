import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Sale } from '@src/database/models/Sale';

export class SaleController {
  public async create(req: Request, res: Response): Promise<void> {
    const repository = getRepository(Sale);
    const sale = repository.create(req.body);
    const abc = await repository.save(sale);

    res.status(201).send(abc);
  }
}
