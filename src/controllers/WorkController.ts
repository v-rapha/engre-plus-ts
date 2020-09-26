import { Sale } from '@src/database/models/Sale';
import { DateDiff } from '@src/services/date-diff';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

const dateDifference = new DateDiff();

export class WorkController {
  public async getWorksForLoggedUser(_: Request, res: Response): Promise<void> {
    const sales = await getRepository(Sale).find({});
    const worksDateDiff = dateDifference.processDateDifferenceForWorks(sales);
    console.log(worksDateDiff);
    res.status(200).send(worksDateDiff);
  }
}
