import { Router } from "express";
import { CategoriesRoutes } from "./Categories.routes";
import { SpecificationsRoutes } from "./Specifications.routes";
import { UsersRoutes } from "./Users.routes";

const routes = Router();

routes.use("/users", UsersRoutes);
routes.use("/categories", CategoriesRoutes);
routes.use("/specifications", SpecificationsRoutes);

export { routes };
