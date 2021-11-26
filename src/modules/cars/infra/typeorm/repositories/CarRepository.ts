import { iCreateCarDTO } from "@modules/cars/dtos/iCreateCarDTO";
import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarRepository implements iCarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  findAvailable(): Promise<Car[]> {
    throw new Error("Method not implemented.");
  }

  async create({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    fine_amount,
    license_plate,
  }: iCreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      brand,
      category_id,
      fine_amount,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ where: { license_plate } });
  }
}

export { CarRepository };
