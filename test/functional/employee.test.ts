import { Employee } from '@src/database/models/Employee';
import { getRepository } from 'typeorm';

describe('Users functional tests', () => {
  beforeEach(async () => await getRepository(Employee).delete({}));
  describe('When creating a new employee', () => {
    it('should successfully create a new employee', async () => {
      const newEmployee = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
      };
      const response = await global.testRequest
        .post('/employee')
        .send(newEmployee);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newEmployee));
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
});
