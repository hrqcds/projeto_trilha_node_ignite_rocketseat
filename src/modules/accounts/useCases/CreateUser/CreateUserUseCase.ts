import { inject, injectable } from "tsyringe";
import { iCreateUserDTO } from "../../dtos/iCreateUserDTO";
import { iUserRepository } from "../../repositories/iUserRepository";
import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private repository: iUserRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: iCreateUserDTO): Promise<void> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new AppError("User already exists", 400);
    }

    const passwordHash = await hash(password, 8);

    await this.repository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
