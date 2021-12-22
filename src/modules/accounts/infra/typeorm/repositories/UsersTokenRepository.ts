import { iCreateUserTokenDTO } from "@modules/accounts/dtos/iCreateUserTokenDTO";
import { iUsersTokensRepository } from "@modules/accounts/repositories/iUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserToken";

class UsersTokenRepository implements iUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: iCreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await this.repository.create({
      expires_date,
      user_id,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokenRepository };
