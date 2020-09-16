import { DateDiff, Work } from "../date-diff";

describe('Date-Diff Service', () => {
  it('should return the date difference merged with the work data for a list of works', () => {
    const works: Work[] = [
      {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initialDate: 1599793200000,
        finalDate: 1600138800000,
        employee: 'employee_id'
      },
      {
        client: 'Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initialDate: 1600138800000,
        finalDate: 1600225200000,
        employee: 'employee_id'
      }
    ];

    const expectedResponse = [
      {
        client: 'José Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initialDate: 1599793200000,
        finalDate: 1600138800000,
        timeLeft: 4
      },
      {
        client: 'Will',
        description: 'KSF90-Engrenagem',
        price: 190.9,
        initialDate: 1600138800000,
        finalDate: 1600225200000,
        timeLeft: 1
      }
    ];

    const dateDiff = new DateDiff();
    const worksWithDateDifference = dateDiff.processDateDifferenceForWorks(works);
    console.log(worksWithDateDifference)
    expect(worksWithDateDifference).toEqual(expectedResponse);
  })
  // describe('Calculate the difference between dates for a given work', () => {
  //   // it('should return the difference between dates for multiples works', async () => {
      // TODO tests for the calculateDateDifference() method
  //   // });
  // })
});