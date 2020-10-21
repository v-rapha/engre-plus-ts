import { Employee } from '@src/models/Employee';
import AuthService from '@src/services/auth';
import { getRepository } from 'typeorm';

describe('Users functional tests', () => {
  beforeEach(async () => await getRepository(Employee).delete({}));
  describe('When creating a new employee', () => {
    it('should successfully create a new employee with encrypted password', async () => {
      const newEmployee = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
      };
      const response = await global.testRequest
        .post('/employee')
        .send(newEmployee);
      expect(response.status).toBe(201);
      await expect(
        AuthService.comparePasswords(
          newEmployee.password,
          response.body.password
        )
      ).resolves.toBeTruthy();
      expect(response.body).toEqual(
        expect.objectContaining({
          ...newEmployee,
          ...{ password: expect.any(String) },
        })
      );
    });

    it('should return 422 when there is a validation error', async () => {
      const newEmployee = {
        email: 'john@email.com',
        password: '1234',
      };
      const response = await global.testRequest
        .post('/employee')
        .send(newEmployee);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'null value in column "name" violates not-null constraint',
      });
    });

    it('should return 409 when the email already exists', async () => {
      const newEmployee = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
      };
      await global.testRequest.post('/employee').send(newEmployee);
      const response = await global.testRequest
        .post('/employee')
        .send(newEmployee);
      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error:
          'duplicate key value violates unique constraint "UQ_765bc1ac8967533a04c74a9f6af"',
      });
    });
  });

  describe('When authenticating a employee', () => {
    it('should generate a token for a valid employee', async () => {
      const newEmployee = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
      };
      // For some reason the line below does not work (the password is not encrypted)
      // await getRepository(Employee).save(newEmployee);
      await global.testRequest.post('/employee').send(newEmployee);
      const response = await global.testRequest
        .post('/employee/authenticate')
        .send({ email: newEmployee.email, password: newEmployee.password });
      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it('should return UNAUTHORIZED if the employee with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/employee/authenticate')
        .send({ email: 'some-email@email.com', password: '1234' });
      expect(response.status).toBe(401);
    });

    it('should return UNAUTHORIZED if the employee is found but the password does not match', async () => {
      const newEmployee = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
      };
      await global.testRequest.post('/employee').send(newEmployee);
      const response = await global.testRequest
        .post('/employee/authenticate')
        .send({ email: newEmployee.email, password: 'different password' });
      expect(response.status).toBe(401);
    });
  });
});
