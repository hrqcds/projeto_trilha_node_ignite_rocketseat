import { Connection, createConnection, getConnectionOptions } from "typeorm";

// por padrão o nome do host é o nome do serviço do docker
export default async (host = "db_ignite"): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOption, {
      host,
    })
  );
};
