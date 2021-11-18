import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    // Instanciando o injectable do tsyringe para uso do repositorio
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    try {
      await createCategoryUseCase.service({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ Error: error.message });
    }
  }
}

export { CreateCategoryController };
