import { container } from "tsyringe";
import { iDateProvider } from "./DateProvider/iDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";

container.registerSingleton<iDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
