import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import {
  iCategoryRepository,
  iCreateCategoryRequestDTO,
} from "../iCategoryRepository";

// Classe implemetada da minha interface, precisa ter todas as funções criadas na interface
class CategoryRepository implements iCategoryRepository {
  // repositorio privado para comunicação com banco, apenas as funções daqui podem fazer esse acesso
  private repository: Repository<Category>;

  constructor() {
    // Iniciando o repositorio
    this.repository = getRepository(Category);
  }

  async create({
    name,
    description,
  }: iCreateCategoryRequestDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }
  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }
}

export { CategoryRepository };
