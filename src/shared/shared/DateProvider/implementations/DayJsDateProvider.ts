import { iDateProvider } from "../iDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

class DayJsDateProvider implements iDateProvider {
  async compare(startDate: Date, endDate: Date): Promise<any> {
    const start = dayjs(startDate).utc().local().format();
    const end = dayjs(endDate).utc().local().format();

    const compare = dayjs(end).diff(start, "hours");

    return compare < 24 ? true : false;
  }
}

export { DayJsDateProvider };
