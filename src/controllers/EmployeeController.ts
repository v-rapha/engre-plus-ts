import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Employee } from '../database/models/Employee';
import { BaseController } from '.';
import AuthService from '../services/auth';

export class EmployeeController extends BaseController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const repository = getRepository(Employee);
      const employeeEntity = repository.create(req.body);
      const employee = await repository.save(employeeEntity);
      res.status(201).send(employee);
    } catch (error) {
      // For the duplicate email i could use the same logic in the method bellow...
      super.sendCreateUpdateErrorResponse(res, error);
    }
  }

  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const employee = await getRepository(Employee).findOne({
      where: { email },
    });
    if (!employee) {
      return res.status(401).send({ code: 401, error: 'User not found!' });
    }
    if (!(await AuthService.comparePasswords(password, employee.password))) {
      return res
        .status(401)
        .send({ code: 401, error: 'Password does not match!' });
    }
    const token = AuthService.generateToken({ employee });
    return res.status(200).send({ token: token });
  }
}
