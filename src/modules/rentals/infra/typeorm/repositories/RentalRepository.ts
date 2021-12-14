import { iCreateRentalDTO } from "@modules/rentals/dtos/iCreateRentalDTO";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalRepository implements iRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: iCreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRetalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id } });
  }
  async findOpenRetalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id } });
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { id } });
  }
}

export { RentalRepository };
