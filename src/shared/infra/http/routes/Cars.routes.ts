import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { Router } from "express";

const CarsRoutes = Router();

const createCarsController = new CreateCarController();

CarsRoutes.post("/", createCarsController.handle);

export { CarsRoutes };
