import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface iRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(private carsRepository: iCarRepository) {}

  async execute({ car_id, specifications_id }: iRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car isen't exists", 404);
    }
  }
}

export { CreateCarSpecificationUseCase };
