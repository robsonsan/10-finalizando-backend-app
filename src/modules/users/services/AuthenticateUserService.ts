/* eslint-disable class-methods-use-this */
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import autoConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password', 401);
    }

    const token = sign({}, autoConfig.jwt.secret, {
      subject: user.id,
      expiresIn: autoConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
