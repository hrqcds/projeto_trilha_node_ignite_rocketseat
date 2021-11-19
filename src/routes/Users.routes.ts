import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";

const UsersRoutes = Router();

const createUserController = new CreateUserController();

const updateUserController = new UpdateUserAvatarController();

UsersRoutes.post("/", createUserController.handle);

UsersRoutes.patch("/", updateUserController.handle);

export { UsersRoutes };
