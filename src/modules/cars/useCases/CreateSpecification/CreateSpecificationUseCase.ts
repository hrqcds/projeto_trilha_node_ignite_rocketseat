import { inject, injectable } from "tsyringe";
import {
  iCreateSpecificationRequestDTO,
  iSpecificationRepository,
} from "../../repositories/iSpecificationRepository";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private repository: iSpecificationRepository
  ) {}

  async service({
    name,
    description,
  }: iCreateSpecificationRequestDTO): Promise<void> {
    const specification = await this.repository.findByName(name);

    if (specification) {
      throw new Error("Specifications already exists");
    }

    await this.repository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
