import { createConnection, getConnectionOptions } from "typeorm";

interface iOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as iOptions;

  newOptions.host = "db_ignite";

  createConnection({ ...options });
});
