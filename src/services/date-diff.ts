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
      worksWithDateDiff.push(enrichedWorkData);
    }
    return worksWithDateDiff;
  }

  public calculateDateDifference(
    initialDate: number,
    finalDate: number
  ): number {
    const today = new Date().setHours(0, 0, 0, 0);
    if(finalDate < today) {
      const negativeDifference = finalDate - today;
      const finalValueNegative = negativeDifference / (1000 * 60 * 60 * 24);
      return finalValueNegative
    }
    const millisecondsDifference = Math.abs(initialDate - finalDate);
    const differenceInDays = millisecondsDifference / (1000 * 60 * 60 * 24);
    return differenceInDays;
  }
}
