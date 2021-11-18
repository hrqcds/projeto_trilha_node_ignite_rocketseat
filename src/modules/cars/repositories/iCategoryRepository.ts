import { Category } from "../entities/Category";

interface iCreateCategoryRequestDTO {
  name: string;
  description: string;
}

interface iCategoryRepository {
  create({ name, description }: iCreateCategoryRequestDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { iCategoryRepository, iCreateCategoryRequestDTO };
