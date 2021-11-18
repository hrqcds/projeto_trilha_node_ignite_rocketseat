import { Router } from "express";
import { CategoriesRoutes } from "./Categories.routes";
import { SpecificationsRoutes } from "./Specifications.routes";

const routes = Router();

routes.use("/categories", CategoriesRoutes);
routes.use("/specifications", SpecificationsRoutes);

export { routes };
