import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import {
  iCreateSpecificationRequestDTO,
  iSpecificationRepository,
} from "../iSpecificationRepository";

class SpecificationRepository implements iSpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async create({
    name,
    description,
  }: iCreateSpecificationRequestDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }
}

export { SpecificationRepository };
