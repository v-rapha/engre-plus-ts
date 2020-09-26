import { Sale } from '@src/database/models/Sale';
import { DefaultDates } from '@src/services/__test__/date-diff.test';
import { getRepository } from 'typeorm';

describe('Works functional tests', () => {
  beforeEach(async () => {
    await getRepository(Sale).delete({});
    const defaultSale = {
      client: 'José Will',
      description: 'KSF90-Engrenagem',
      price: 190.9,
      initial_date: DefaultDates.SEP_SIXTEEN,
      final_date: DefaultDates.SEP_TWENTY_SIX,
    };
    await getRepository(Sale).save(defaultSale);
  });

  it('should return a list with just a few works', async () => {
    const { body, status } = await global.testRequest.get('/works');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initial_date: '16/09/2020',
        final_date: '26/09/2020',
        timeLeft: 10,
      },
      // {
      //   client: 'Will Smith',
      //   description: 'KSF50-Engrenagem',
      //   price: 120.55,
      //   initial_date: '09/09/2020',
      //   final_date: '08/09/2020',
      //   timeLeft: 1,
      // },
    ]);
  });
});
