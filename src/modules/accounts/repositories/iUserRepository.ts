import { iCreateUserDTO } from "../dtos/iCreateUserDTO";
import { User } from "../entities/User";

interface iUserRepository {
  create(data: iCreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}

export { iUserRepository };
