import { DateDiff, Work } from '../date-diff';

describe('Date-Diff Service', () => {
  // TODO find a way to mock the "today's" value
  const defaultDateDiff = new DateDiff();
  describe('Calculate date difference for a given work', () => {
    it('should return the date difference merged with the work data for a list of works', () => {
      const works: Work[] = [
        {
          client: 'José Will',
          description: 'KSF90-Engrenagem',
          price: 190.9,
          initialDate: 1599793200000,
          finalDate: 1600138800000,
          employee: 'employee_id',
        },
        {
          client: 'Will',
          description: 'KSF99-Engrenagem',
          price: 199.9,
          initialDate: 1600138800000,
          finalDate: 1600225200000,
          employee: 'employee_id',
        },
        {
          client: 'Raphael',
          description: 'KSF50-Engrenagem',
          price: 150.9,
          initialDate: 1600225200000,
          finalDate: 1600138800000,
          employee: 'employee_id',
        },
      ];

      const expectedResponse = [
        {
          client: 'José Will',
          description: 'KSF90-Engrenagem',
          price: 190.9,
          initialDate: 1599793200000,
          finalDate: 1600138800000,
          timeLeft: 4,
        },
        {
          client: 'Will',
          description: 'KSF99-Engrenagem',
          price: 199.9,
          initialDate: 1600138800000,
          finalDate: 1600225200000,
          timeLeft: 1,
        },
        {
          client: 'Raphael',
          description: 'KSF50-Engrenagem',
          price: 150.9,
          initialDate: 1600225200000,
          finalDate: 1600138800000,
          timeLeft: -1,
        },
      ];

      const dateDiff = new DateDiff();
      const worksWithDateDifference = dateDiff.processDateDifferenceForWorks(
        works
      );
      console.log(worksWithDateDifference);
      expect(worksWithDateDifference).toEqual(expectedResponse);
    });
  });

  describe('Get positive values for given dates', () => {
    it('should get date difference of 1 for the given date (2020-09-16 to 2020-09-17)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1600225200000,
        1600311600000
      );
      expect(timeLeft).toBe(1);
    });

    it('should get date difference of 10 for the given date (2020-09-16 to 2020-09-26)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1600225200000,
        1601089200000
      );
      expect(timeLeft).toBe(10);
    });

    it('should get date difference of 28 for the given date (2020-09-16 to 2020-10-14)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1600225200000,
        1602644400000
      );
      expect(timeLeft).toBe(28);
    });

    it('should get date difference of 31 for the given date (2020-09-16 to 2020-10-17)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1600225200000,
        1602903600000
      );
      expect(timeLeft).toBe(31);
    });
  });

  describe('Get negative values for given dates', () => {
    it('should get date difference of -1 for the given date (2020-09-10 to 2020-09-16)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1599706800000,
        1600225200000
      );
      expect(timeLeft).toBe(-1);
    });

    it('should get date difference of -10 for the given date (2020-09-06 to 2020-09-07)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1599361200000,
        1599447600000
      );
      expect(timeLeft).toBe(-10);
    });

    it('should get date difference of -28 for the given date (2020-08-19 to 2020-08-20)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1597806000000,
        1597892400000
      );
      expect(timeLeft).toBe(-28);
    });

    it('should get date difference of -31 for the given date (2020-08-16 to 2020-08-17)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        1597546800000,
        1597633200000
      );
      expect(timeLeft).toBe(-31);
    });
  });
});
