import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { AppError } from "@shared/errors/AppError";

import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";

// dayjs.extend(utc); // usar o formato utc pra comparação de datas

import { DayJsDateProvider } from "@shared/shared/DateProvider/implementations/DayJsDateProvider";

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

    // data recebida em utc
    const expectedReturnDateFormat = dayjs(expected_return_date).toDate();

    const dateNow = dayjs().toDate(); // data de hoje em utc para comparação

    const dateProvider = new DayJsDateProvider();

    const valideDate = await dateProvider.compare(
      dateNow,
      expectedReturnDateFormat
    );

    // // comparando a data esperada com a data atual em horas
    // const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    // if (compare < 24) {
    //   throw new AppError("Não é possível agendar, prazo muito curto");
    // }

    if (valideDate) {
      throw new AppError("Não é possível agendar, prazo muito curto");
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
