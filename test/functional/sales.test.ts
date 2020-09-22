describe('Sales functional tests', () => {
  describe('When creating a sale', () => {
    it('should create a sale with success', async () => {
      const newSale = {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initialDate: '2020-09-16',
        finalDate: '2020-09-17',
      };
      const response = await global.testRequest.post('/sales').send(newSale);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newSale));
    });
  });
});
