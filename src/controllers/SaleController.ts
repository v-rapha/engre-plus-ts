import { DateService } from '../services/date';
import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';

import { Sale } from '../models/Sale';

export class SaleController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        client,
        description,
        price,
        initial_date: i_d,
        final_date: f_d,
      } = req.body;

      const [
        initial_date,
        final_date,
      ] = DateService.convertStringDateToMillisecondDate([i_d, f_d]);

      const id = req.decoded?.employee.id;
      const repository = getRepository(Sale);
      // console.info(id?.employee.id)
      const saleEntity = repository.create({
        client,
        description,
        price,
        initial_date,
        final_date,
        employee: { id },
      });
      const sale = await repository.save(saleEntity);
      res.status(201).send(sale);
    } catch (error) {
      // console.log(error);
      if (error instanceof QueryFailedError) {
        res.status(422).send({ error: error.message });
      } else {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
