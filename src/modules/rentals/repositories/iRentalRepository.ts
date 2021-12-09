import { Rental } from "../infra/typeorm/entities/Rental";

interface iRentalsRepository {
  findOpenRetalByCar(car_id: string): Promise<Rental>;
  findOpenRetalByUser(user_id: string): Promise<Rental>;
}

export { iRentalsRepository };
