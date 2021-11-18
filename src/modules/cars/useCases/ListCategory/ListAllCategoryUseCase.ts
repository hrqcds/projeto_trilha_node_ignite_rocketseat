import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { iCategoryRepository } from "../../repositories/iCategoryRepository";

@injectable()
class ListAllCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private repository: iCategoryRepository
  ) {}

  async service(): Promise<Category[]> {
    const categories = await this.repository.list();

    return categories;
  }
}

export { ListAllCategoryUseCase };
