import { iCreateUserDTO } from "../dtos/iCreateUserDTO";
import { User } from "../entities/User";

interface iUserRepository {
  create(data: iCreateUserDTO): Promise<void>;
  findByUsername(email: string): Promise<User>;
}

export { iUserRepository };
