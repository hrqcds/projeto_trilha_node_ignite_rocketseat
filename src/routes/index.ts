import { Router } from "express";
import { CategoriesRoutes } from "./Categories.routes";

const routes = Router();

routes.use("/categories", CategoriesRoutes);

export { routes };
