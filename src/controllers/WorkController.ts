import { Sale } from '../database/models/Sale';
import { DateDiff } from '../services/date-diff';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

const dateDifference = new DateDiff();

export class WorkController {
  public async getWorksForLoggedUser(_: Request, res: Response): Promise<void> {
    try {
      const sales = await getRepository(Sale).find({});
      const worksDateDiff = dateDifference.processDateDifferenceForWorks(sales);
      console.log(worksDateDiff);
      res.status(200).send(worksDateDiff);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Something went wrong ' });
    }
  }
}
