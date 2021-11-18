import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { iUserRepository } from "../../repositories/iUserRepository";

interface iRequest {
  email: string;
  password: string;
}

interface iResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private repository: iUserRepository
  ) {}

  async execute({ email, password }: iRequest): Promise<iResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Email or Password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or Password incorrect!");
    }

    const token = sign(
      { name: user.name, email: user.email },
      "25b7bb3918ca0875a70ebe05e98d5f76",
      {
        expiresIn: "1d",
        subject: user.id,
      }
    );

    const userResponse: iResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return userResponse;
  }
}

export { AuthenticateUserUseCase };
