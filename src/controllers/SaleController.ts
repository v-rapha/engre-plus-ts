import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';

import { Sale } from '../models/Sale';

export class SaleController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const repository = getRepository(Sale);
      const saleEntity = repository.create(req.body);
      const sale = await repository.save(saleEntity);
      res.status(201).send(sale);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        res.status(422).send({ error: error.message });
      } else {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
