import { iCarDTO } from "@modules/cars/dtos/iCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { iCarRepository } from "../iCarRepository";

class CarRepositoryInMemory implements iCarRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    fine_amount,
    license_plate,
  }: iCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      brand,
      category_id,
      fine_amount,
      license_plate,  
      available: true    
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}

export { CarRepositoryInMemory };
