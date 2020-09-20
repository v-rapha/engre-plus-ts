import config from 'config';

export interface Work {
  client: string;
  description: string;
  price: number;
  initialDate: number;
  finalDate: number;
  employee: string;
}

export interface WorkDateDiff extends Omit<Work, 'employee'> {
  timeLeft: number;
}

export class DateDiff {
  public processDateDifferenceForWorks(works: Work[]): WorkDateDiff[] {
    const worksWithDateDiff: WorkDateDiff[] = [];
    for (const work of works) {
      const dateDiff = this.calculateDateDifference(
        work.initialDate,
        work.finalDate
      );
      const enrichedWorkData = {
        client: work.client,
        description: work.description,
        price: work.price,
        initialDate: work.initialDate,
        finalDate: work.finalDate,
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
    const today: number =
      config.get('App.staticDate') || new Date().setHours(0, 0, 0, 0);
    if (finalDate < today) {
      const negativeDifference = finalDate - today;
      return this.convertMillisecondsToDays(negativeDifference);
    }
    const millisecondsDifference = Math.abs(initialDate - finalDate);
    return this.convertMillisecondsToDays(millisecondsDifference);
  }

  private convertMillisecondsToDays(milliseconds: number): number {
    return milliseconds / (1000 * 60 * 60 * 24);
  }
}
