import { Request, Response } from "express";


export class WorksController {
  public getWorksForLoggedUser(_: Request, res: Response): void {
    res.status(200).send([{
      "client": "José Will",
      "description": "KSF90-Engrenagem",
      "price": 190.90,
      "initialDate": "11/09/2020",
      "finalDate": "15/09/2020",
      "timeLeft": 4
    },{
      "client": "Will Smith",
      "description": "KSF50-Engrenagem",
      "price": 120.55,
      "initialDate": "09/09/2020",
      "finalDate": "08/09/2020",
      "timeLeft": 1
    }]);
  }
}