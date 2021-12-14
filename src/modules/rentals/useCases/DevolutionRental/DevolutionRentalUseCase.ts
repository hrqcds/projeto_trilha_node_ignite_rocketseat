import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { iDateProvider } from "@shared/container/providers/DateProvider/iDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface iRequest {
  id: string;
  user_id: string;
}

class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: iRentalsRepository,

    @inject("CarRepository")
    private carsRepository: iCarRepository,

    @inject("DayJsDateProvider")
    private dateProvider: iDateProvider
  ) {}

  async execute({ id, user_id }: iRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const dateNow = this.dateProvider.dateNow();

    // verificar o tempo de aluguel
    const diffInHours = this.dateProvider.compareInHours(
      dateNow,
      rental.expected_return_date
    );

    if (diffInHours <= 0) {
    }
  }
}

export { DevolutionRentalUseCase };
