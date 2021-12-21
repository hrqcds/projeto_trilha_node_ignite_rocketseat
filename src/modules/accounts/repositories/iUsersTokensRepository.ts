import { iCreateUserTokenDTO } from "../dtos/iCreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserToken";

interface iUsersTokensRepository {
  create({
    expires_date,
    user_id,
    refresh_token,
  }: iCreateUserTokenDTO): Promise<UserTokens>;
}

export { iUsersTokensRepository };
