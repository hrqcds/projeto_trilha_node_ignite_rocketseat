// Adicionar coluna avatar na tabela de users - ok
// Refatorar usuario com coluna avatar - ok
// configuração upload multer
// Criar regra de negocio do upload
// Criar controller

import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { iUserRepository } from "../../repositories/iUserRepository";

interface iRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private repository: iUserRepository
  ) {}

  async execute({ user_id, avatarFile }: iRequest): Promise<void> {
    const user = await this.repository.findById(user_id);

    // verificando se já existe avatar
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.repository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
