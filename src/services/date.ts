import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export class DateService {
  public static convertMillisecondDateToStringDate(
    milliseconds: number[]
  ): string[] {
    const dates: string[] = [];
    for (const millisecond of milliseconds) {
      const formattedDate = dayjs(millisecond).format('DD/MM/YYYY');
      dates.push(formattedDate);
    }
    return dates;
  }

  public static convertStringDateToMillisecondDate(dates: string[]): number[] {
    // I'm not sure, but i don't think i need to use the UTC plugin. Just use the .valueOf()
    dayjs.extend(utc);
    const result = dates.map(date => {
      const sm = dayjs(date).utc().valueOf();
      return sm;
    });
    return result;
  }
}
