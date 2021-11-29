import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const carSpecfication = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.status(201).json(carSpecfication);
  }
}

export { CreateCarSpecificationController };
