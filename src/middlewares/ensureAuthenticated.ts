import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface iPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization; // recebendo o token do header authorization

  // verificando se veio algum dado no header
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // separando o beader do token
  const [_, token] = authHeader.split(" ");

  try {
    //   Recebendo o sub do token (id de usuario)
    const { sub: user_id } = verify(
      token,
      "25b7bb3918ca0875a70ebe05e98d5f76"
    ) as iPayload;

    // instanciando o repositorio de usuarios
    const userRepository = new UserRepository();

    // buscando do usuario no banco
    const user = await userRepository.findById(user_id);

    // Se usuario não exister, retornar erro
    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    // se exister, seguir aplicação
    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
