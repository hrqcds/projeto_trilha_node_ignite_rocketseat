import { iCreateRentalDTO } from "@modules/rentals/dtos/iCreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { iRentalsRepository } from "../iRentalRepository";

class RentalRepositoryInMemory implements iRentalsRepository {
  private rentalRepository: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: iCreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      created_date: new Date(),
      updated_at: new Date(),
    });

    this.rentalRepository.push(rental);

    return rental;
  }

  async findOpenRetalByCar(car_id: string): Promise<Rental> {
    return this.rentalRepository.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRetalByUser(user_id: string): Promise<Rental> {
    return this.rentalRepository.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
}

export { RentalRepositoryInMemory };
