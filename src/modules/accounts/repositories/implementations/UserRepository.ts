import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { iUserRepository } from "../iUserRepository";
import { iCreateUserDTO } from "../../dtos/iCreateUserDTO";

class UserRepository implements iUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByUsername(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: iCreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
