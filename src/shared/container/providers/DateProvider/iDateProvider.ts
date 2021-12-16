interface iDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}

export { iDateProvider };
