import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Employee } from "../database/models/Employee";

export class EmployeeController {
  public async create(req: Request, res: Response): Promise<void> {
    const repository = getRepository(Employee);
    const employeeEntity = repository.create(req.body);
    const employee = await repository.save(employeeEntity);
    res.status(201).send(employee);
  }
}