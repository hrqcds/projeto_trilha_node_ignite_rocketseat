import { iCarDTO } from "@modules/cars/dtos/iCarDTO";
import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarRepository implements iCarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    fine_amount,
    license_plate,
  }: iCarDTO): Promise<Car> {
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
