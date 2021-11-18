import { inject, injectable } from "tsyringe";
import {
  iCategoryRepository,
  iCreateCategoryRequestDTO,
} from "../../repositories/iCategoryRepository";

// Injetavel do tsyringe para informar que vai usar o repositorio
@injectable()
class CreateCategoryUseCase {
  constructor(
    // Instanciando o repositorio para uso do serviço
    @inject("CategoryRepository")
    private repository: iCategoryRepository
  ) {}

  async service({
    name,
    description,
  }: iCreateCategoryRequestDTO): Promise<void> {
    const category = await this.repository.findByName(name);

    if (category) {
      throw new Error("Category already exists");
    }

    await this.repository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
