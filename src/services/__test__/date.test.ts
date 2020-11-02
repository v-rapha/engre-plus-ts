import { DateService } from '../date';
import { DefaultDates } from './diff-date.test';

describe.skip('Date Service', () => {
  // const defaultDateDiff = new DateDiff();
  describe('Convert Millisecond Date To String Date', () => {
    it('should convert the millisecond date for a readable date ("16/09/2020", "17/09/2020")', () => {
      const result = DateService.convertMillisecondDateToStringDate([
        DefaultDates.SEP_SIXTEEN,
        DefaultDates.SEP_SEVENTEEN,
      ]);
      expect(result).toEqual(['16/09/2020', '17/09/2020']);
    });

    it('should convert the millisecond date for a readable date ("20/08/2020", "12/09/2020")', () => {
      const result = DateService.convertMillisecondDateToStringDate([
        DefaultDates.AUG_TWENTY,
        DefaultDates.SEP_TWELVE,
      ]);
      expect(result).toEqual(['20/08/2020', '12/09/2020']);
    });

    it('should convert the millisecond date for a readable date ("17/09/2020", "17/10/2020")', () => {
      const result = DateService.convertMillisecondDateToStringDate([
        DefaultDates.SEP_SEVENTEEN,
        DefaultDates.OCT_SEVENTEEN,
      ]);
      expect(result).toEqual(['17/09/2020', '17/10/2020']);
    });
  });

  describe('Convert String Date To Millisecond Date', () => {
    it('should convert the date in string to a millisecond date', () => {
      const result = DateService.convertStringDateToMillisecondDate([
        '2020-09-16',
        '2020-09-17',
      ]);
      expect(result).toEqual([
        DefaultDates.SEP_SIXTEEN,
        DefaultDates.SEP_SEVENTEEN,
      ]);
    });

    it('should convert the date in string to a millisecond date', () => {
      const result = DateService.convertStringDateToMillisecondDate([
        '2020-08-20',
        '2020-10-17',
      ]);
      expect(result).toEqual([
        DefaultDates.AUG_TWENTY,
        DefaultDates.OCT_SEVENTEEN,
      ]);
    });
  });
});
