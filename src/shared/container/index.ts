import { container } from "tsyringe";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { iCategoryRepository } from "@modules/cars/repositories/iCategoryRepository";
import { iSpecificationRepository } from "@modules/cars/repositories/iSpecificationRepository";

container.registerSingleton<iCategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<iSpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<iUserRepository>("UserRepository", UserRepository);
