interface iDateProvider {
  compare(startDate: Date, endDate: Date): Promise<any>;
}

export { iDateProvider };
