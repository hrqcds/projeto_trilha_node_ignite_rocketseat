import { container } from "tsyringe";
import { iDateProvider } from "./DateProvider/iDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";
import { iMailProvider } from "./MailProvider/iMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<iDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);

container.registerInstance<iMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
