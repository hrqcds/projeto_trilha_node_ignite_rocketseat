import { inject, injectable } from "tsyringe";
import {
  iCategoryRepository,
  iCreateCategoryRequestDTO,
} from "../../repositories/iCategoryRepository";

@injectable()
class CreateCategoryUseCase {
  constructor(
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
