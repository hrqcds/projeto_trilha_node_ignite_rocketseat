import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { iRentalsRepository } from "../iRentalRepository";

class RentalRepositoryInMemory implements iRentalsRepository {
  private rentalRepository: Rental[] = [];

  async findOpenRetalByCar(car_id: string): Promise<Rental> {
    return this.rentalRepository.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );
  }
  async findOpenRetalByUser(user_id: string): Promise<Rental> {
    return this.rentalRepository.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    );
  }
}

export { RentalRepositoryInMemory };
