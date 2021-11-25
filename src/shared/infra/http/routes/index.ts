import { Router } from "express";
import { AuthenticateRoutes } from "./Authenticate.routes";
import { CarsRoutes } from "./Cars.routes";
import { CategoriesRoutes } from "./Categories.routes";
import { SpecificationsRoutes } from "./Specifications.routes";
import { UsersRoutes } from "./Users.routes";

const routes = Router();

routes.use(AuthenticateRoutes);
routes.use("/users", UsersRoutes);
routes.use("/categories", CategoriesRoutes);
routes.use("/specifications", SpecificationsRoutes);
routes.use("/cars", CarsRoutes);

export { routes };
