import { Request, Response } from 'express';

export class WorkController {
  public getWorksForLoggedUser(_: Request, res: Response): void {
    res.status(200).send([
      {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initial_date: '11/09/2020',
        final_date: '15/09/2020',
        timeLeft: 4,
      },
      {
        client: 'Will Smith',
        description: 'KSF50-Engrenagem',
        price: 120.55,
        initial_date: '09/09/2020',
        final_date: '08/09/2020',
        timeLeft: 1,
      },
    ]);
  }
}
