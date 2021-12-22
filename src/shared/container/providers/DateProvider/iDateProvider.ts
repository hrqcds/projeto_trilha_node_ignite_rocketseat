interface iDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  addDays(days: number): Date;
  dateNow(): Date;
}

export { iDateProvider };
