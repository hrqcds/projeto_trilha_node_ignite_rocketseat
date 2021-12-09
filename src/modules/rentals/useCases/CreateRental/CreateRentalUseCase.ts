import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { AppError } from "@shared/errors/AppError";

interface iRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: iRentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: iRequest): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findOpenRetalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRetalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }
  }
}

export { CreateRentalUseCase };
