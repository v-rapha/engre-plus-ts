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
  });
});
