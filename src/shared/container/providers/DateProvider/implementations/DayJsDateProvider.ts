import { iDateProvider } from "../iDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

class DayJsDateProvider implements iDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const start = this.convertToUTC(startDate);
    const end = this.convertToUTC(endDate);

    return dayjs(end).diff(start, "hours");
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayJsDateProvider };
