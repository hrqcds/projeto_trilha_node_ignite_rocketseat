import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const RentalRoutes = Router();

const createRentalController = new CreateRentalController();

RentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { RentalRoutes };
