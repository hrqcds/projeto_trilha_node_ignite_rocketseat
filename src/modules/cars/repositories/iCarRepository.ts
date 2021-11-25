import { iCarDTO } from "../dtos/iCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface iCarRepository {
  create(data: iCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { iCarRepository };
