import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { AppError } from "@shared/errors/AppError";

import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { inject, injectable } from "tsyringe";
import { iDateProvider } from "@shared/container/providers/DateProvider/iDateProvider";

interface iRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: iRentalsRepository,

    @inject("DayJsDateProvider")
    private dateProvider: iDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: iRequest): Promise<Rental> {
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

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < 24) {
      throw new AppError("Data desgraçada");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
