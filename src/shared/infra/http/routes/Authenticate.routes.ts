import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const AuthenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

AuthenticateRoutes.post("/sessions", authenticateUserController.handle);

export { AuthenticateRoutes };
