import Usertoken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generate(user_id: string): Promise<Usertoken>;
  findByToken(token: string): Promise<Usertoken | undefined>;
}
