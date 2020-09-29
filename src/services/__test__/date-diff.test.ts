import { DateDiff, Work } from '../date-diff';

export enum DefaultDates {
  AUG_SIXTEEN = 1597546800000,
  AUG_SEVENTEEN = 1597633200000,
  AUG_NINETEEN = 1597806000000,
  AUG_TWENTY = 1597892400000,
  SEP_SIX = 1599361200000,
  SEP_SEVEN = 1599447600000,
  SEP_TWELVE = 1599879600000,
  SEP_SIXTEEN = 1600225200000,
  SEP_SEVENTEEN = 1600311600000,
  SEP_TWENTY_TWO = 1600743600000,
  SEP_TWENTY_SIX = 1601089200000,
  OCT_FOURTEEN = 1602644400000,
  OCT_SEVENTEEN = 1602903600000,
}

describe('Date-Diff Service', () => {
  const defaultDateDiff = new DateDiff();
  describe('Calculate date difference for a given work', () => {
    it('should return the date difference merged with the work data for a list of works', () => {
      const works: Work[] = [
        {
          client: 'José Will',
          description: 'KSF90-Engrenagem',
          price: 190.9,
          initial_date: DefaultDates.SEP_SEVENTEEN,
          final_date: DefaultDates.SEP_TWENTY_TWO,
          employee: 'employee_id',
        },
        {
          client: 'Will',
          description: 'KSF99-Engrenagem',
          price: 199.9,
          initial_date: DefaultDates.SEP_SIXTEEN,
          final_date: DefaultDates.SEP_SEVENTEEN,
          employee: 'employee_id',
        },
        {
          client: 'Raphael',
          description: 'KSF50-Engrenagem',
          price: 150.9,
          initial_date: DefaultDates.SEP_TWELVE,
          final_date: DefaultDates.SEP_SIXTEEN,
          employee: 'employee_id',
        },
      ];

      const expectedResponse = [
        {
          client: 'José Will',
          description: 'KSF90-Engrenagem',
          price: 190.9,
          initial_date: '17/09/2020',
          final_date: '22/09/2020',
          timeLeft: 5,
        },
        {
          client: 'Will',
          description: 'KSF99-Engrenagem',
          price: 199.9,
          initial_date: '16/09/2020',
          final_date: '17/09/2020',
          timeLeft: 0,
        },
        {
          client: 'Raphael',
          description: 'KSF50-Engrenagem',
          price: 150.9,
          initial_date: '12/09/2020',
          final_date: '16/09/2020',
          timeLeft: -1,
        },
      ];

      const dateDiff = new DateDiff();
      const worksWithDateDifference = dateDiff.processDateDifferenceForWorks(
        works
      );
      expect(worksWithDateDifference).toEqual(expectedResponse);
    });

    it('should return an empty list when the works array is empty', () => {
      const dateDiff = new DateDiff();
      const response = dateDiff.processDateDifferenceForWorks([]);
      expect(response).toEqual([]);
    });
  });

  describe('Get positive values for given dates', () => {
    it('should get date difference of 1 for the given date (2020-09-16 to 2020-09-17)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.SEP_SIXTEEN,
        DefaultDates.SEP_SEVENTEEN
      );
      expect(timeLeft).toBe(0);
    });

    it('should get date difference of 10 for the given date (2020-09-16 to 2020-09-26)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.SEP_SIXTEEN,
        DefaultDates.SEP_TWENTY_SIX
      );
      expect(timeLeft).toBe(10);
    });

    it('should get date difference of 28 for the given date (2020-09-16 to 2020-10-14)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.SEP_SIXTEEN,
        DefaultDates.OCT_FOURTEEN
      );
      expect(timeLeft).toBe(28);
    });

    it('should get date difference of 31 for the given date (2020-09-16 to 2020-10-17)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.SEP_SIXTEEN,
        DefaultDates.OCT_SEVENTEEN
      );
      expect(timeLeft).toBe(31);
    });
  });

  describe('Get negative values for given dates', () => {
    it('should get date difference of -1 for the given date (2020-09-12 to 2020-09-16)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.SEP_TWELVE,
        DefaultDates.SEP_SIXTEEN
      );
      expect(timeLeft).toBe(-1);
    });

    it('should get date difference of -10 for the given date (2020-09-06 to 2020-09-07)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.SEP_SIX,
        DefaultDates.SEP_SEVEN
      );
      expect(timeLeft).toBe(-10);
    });

    it('should get date difference of -28 for the given date (2020-08-19 to 2020-08-20)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.AUG_NINETEEN,
        DefaultDates.AUG_TWENTY
      );
      expect(timeLeft).toBe(-28);
    });

    it('should get date difference of -31 for the given date (2020-08-16 to 2020-08-17)', () => {
      const timeLeft = defaultDateDiff.calculateDateDifference(
        DefaultDates.AUG_SIXTEEN,
        DefaultDates.AUG_SEVENTEEN
      );
      expect(timeLeft).toBe(-31);
    });
  });
});

describe('Format Date', () => {
  const defaultDateDiff = new DateDiff();
  it('should format the millisecond date for a readable date ("16/09/2020", "17/09/2020")', () => {
    const sm = defaultDateDiff.formatDateWithMilliseconds([
      DefaultDates.SEP_SIXTEEN,
      DefaultDates.SEP_SEVENTEEN,
    ]);
    expect(sm).toEqual(['16/09/2020', '17/09/2020']);
  });

  it('should format the millisecond date for a readable date ("20/08/2020", "12/09/2020")', () => {
    const sm = defaultDateDiff.formatDateWithMilliseconds([
      DefaultDates.AUG_TWENTY,
      DefaultDates.SEP_TWELVE,
    ]);
    expect(sm).toEqual(['20/08/2020', '12/09/2020']);
  });

  it('should format the millisecond date for a readable date ("17/09/2020", "17/10/2020")', () => {
    const sm = defaultDateDiff.formatDateWithMilliseconds([
      DefaultDates.SEP_SEVENTEEN,
      DefaultDates.OCT_SEVENTEEN,
    ]);
    expect(sm).toEqual(['17/09/2020', '17/10/2020']);
  });
});
