import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Employee } from '../database/models/Employee';
import { BaseController } from '.';

export class EmployeeController extends BaseController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const repository = getRepository(Employee);
      const employeeEntity = repository.create(req.body);
      const employee = await repository.save(employeeEntity);
      res.status(201).send(employee);
    } catch (error) {
      super.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
