import { Sale } from '@src/database/models/Sale';
import { DefaultDates } from '@src/services/__test__/date-diff.test';
import { getRepository } from 'typeorm';

describe('Sales functional tests', () => {
  beforeEach(async () => getRepository(Sale).delete({}));
  describe('When creating a sale', () => {
    it('should create a sale with success', async () => {
      const newSale = {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initial_date: DefaultDates.SEP_SIXTEEN,
        final_date: DefaultDates.SEP_SEVEN,
      };
      const response = await global.testRequest.post('/sales').send(newSale);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newSale));
    });
  });
});
