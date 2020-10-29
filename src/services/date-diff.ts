import { Employee } from '../models/Employee';
import config from 'config';
import { DateService } from './date';

export interface Work {
  client: string;
  description: string;
  price: number;
  initial_date: number;
  final_date: number;
  employee?: Partial<Employee>;
}

export interface WorkDateDiff
  extends Omit<Work, 'employee' | 'initial_date' | 'final_date'> {
  initial_date: string;
  final_date: string;
  timeLeft: number;
}

export class DateDiff {
  public processDateDifferenceForWorks(works: Work[]): WorkDateDiff[] {
    const worksWithDateDiff: WorkDateDiff[] = [];
    for (const work of works) {
      const dateDiff = this.calculateDateDifference(
        work.initial_date,
        work.final_date
      );
      // I had to convert to Number() because postgres was returning the milliseconds as string
      const formattedDate = DateService.convertMillisecondDateToStringDate([
        Number(work.initial_date),
        Number(work.final_date),
      ]);
      const enrichedWorkData = {
        client: work.client,
        description: work.description,
        price: work.price,
        initial_date: formattedDate[0],
        final_date: formattedDate[1],
        timeLeft: dateDiff,
      };
      // I think the spread operator is not necessary here
      worksWithDateDiff.push({ ...enrichedWorkData });
    }
    return worksWithDateDiff;
  }

  // TODO: try to make the method more clearer
  public calculateDateDifference(
    initialDate: number,
    finalDate: number
  ): number {
    const today: number = config.has('App.staticDate')
      ? config.get('App.staticDate')
      : new Date().setHours(0, 0, 0, 0);
    if (Number(finalDate) < today) {
      const negativeDifference = finalDate - today;
      return this.convertMillisecondsToDays(negativeDifference);
    }
    if (Number(finalDate) === today) {
      return finalDate - today;
    }
    const millisecondsDifference = Math.abs(initialDate - finalDate);
    return this.convertMillisecondsToDays(millisecondsDifference);
  }

  private convertMillisecondsToDays(milliseconds: number): number {
    return milliseconds / (1000 * 60 * 60 * 24);
  }
}
