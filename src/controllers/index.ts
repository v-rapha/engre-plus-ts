import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

export abstract class BaseController {
  protected sendCreateUpdateErrorResponse(
    res: Response,
    error: QueryFailedError | Error
  ): void {
    if (error instanceof QueryFailedError) {
      // console.log(Object.values(error))
      // console.log(Object.keys(error))
      // console.log(error)
      // const clientErrors = this.handleClientErrors(error);
      const duplicate = Object.values(error).filter(err => err === '23505');
      if (duplicate.length) {
        res.status(409).send({ code: 409, error: error.message });
      } else {
        res.status(422).send({ code: 422, error: error.message });
      }
      // res
      //   .status(clientErrors.code)
      //   .send({ code: clientErrors.code, error: clientErrors.error });
    } else {
      res.status(500).send({ code: 500, error: 'Something went wrong!' });
    }
  }

  private handleClientErrors(
    error: QueryFailedError
  ): { code: number; error: string } {
    // Convert the number error to a enum with postgreSQL errors codes
    const duplicate = Object.values(error).filter(err => err === '23505');
    if (duplicate.length) {
      return { code: 409, error: error.message };
    }
    return { code: 422, error: error.message };
  }
}
