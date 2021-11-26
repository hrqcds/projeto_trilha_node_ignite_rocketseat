import { iCreateCarDTO } from "@modules/cars/dtos/iCreateCarDTO";
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

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    // QueryBuilder -> recebe um nome para as buscas
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("c.available = :available", { available: true }); // busca todos os available com valor true

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id }); // se existir categoria busca todas com aquele id
    }

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand }); // se existir marca busca todas com aquela marca
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name }); // se existir nome busca todos com aquele nome
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarRepository };
