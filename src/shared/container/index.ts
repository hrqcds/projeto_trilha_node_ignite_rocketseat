import { container } from "tsyringe";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { iUserRepository } from "../../modules/accounts/repositories/iUserRepository";
import { iCategoryRepository } from "../../modules/cars/repositories/iCategoryRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoryRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { iSpecificationRepository } from "../../modules/cars/repositories/iSpecificationRepository";

container.registerSingleton<iCategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<iSpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<iUserRepository>("UserRepository", UserRepository);
