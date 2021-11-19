import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const { id } = request.user;

    const avatarFile = null;

    await updateUserAvatarUseCase.execute({ user_id: id, avatarFile });

    return response.status(204).send();
    // Receber arquivo
    // const { file } = request;
  }
}

export { UpdateUserAvatarController };
