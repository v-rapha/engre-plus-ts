import { Employee } from '@src/models/Employee';
import { Sale } from '@src/models/Sale';
import AuthService from '@src/services/auth';
import { getRepository } from 'typeorm';

describe('Sales functional tests', () => {
  const defaultEmployee = {
    name: 'John Doe',
    email: 'john@email.com',
    password: '1234',
  };
  let token: string;
  beforeEach(async () => {
    await getRepository(Sale).delete({});
    await getRepository(Employee).delete({});
    const employeeEntity = getRepository(Employee).create(defaultEmployee);
    const employee = await getRepository(Employee).save(employeeEntity);
    token = AuthService.generateToken({ employee });
  });
  describe('When creating a sale', () => {
    it('should create a sale with success', async () => {
      const newSale = {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initial_date: '2020-09-16',
        final_date: '2020-09-07',
      };
      const response = await global.testRequest
        .post('/sales')
        .set({ 'x-access-token': token })
        .send(newSale);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          ...newSale,
          ...{
            initial_date: expect.any(Number),
            final_date: expect.any(Number),
          },
        })
      );
    });

    it('should return 422 when there is a validation error', async () => {
      const newSale = {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initial_date: 'invalid_string',
        final_date: '2020-09-07',
      };
      const response = await global.testRequest
        .post('/sales')
        .set({ 'x-access-token': token })
        .send(newSale);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'invalid input syntax for type bigint: "NaN"',
      });
    });

    it.skip('should return 500 when there is any error other than validation error', async () => {
      // TODO think in a way to throw a 500
    });
  });
});
