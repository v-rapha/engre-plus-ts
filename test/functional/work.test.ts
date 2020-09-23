describe('Works functional tests', () => {
  it('should return a list with just a few works', async () => {
    const { body, status } = await global.testRequest.get('/works');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initial_date: '11/09/2020',
        final_date: '15/09/2020',
        timeLeft: 4,
      },
      {
        client: 'Will Smith',
        description: 'KSF50-Engrenagem',
        price: 120.55,
        initial_date: '09/09/2020',
        final_date: '08/09/2020',
        timeLeft: 1,
      },
    ]);
  });
});
