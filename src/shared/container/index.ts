import { container } from "tsyringe";
import { iCategoryRepository } from "../../modules/cars/repositories/iCategoryRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoryRepository";

container.registerSingleton<iCategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
