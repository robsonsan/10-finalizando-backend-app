import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    return this.users.filter((user) => user.id !== except_user_id);
  }

  public async findById(id: string): Promise<User | undefined> {
    const userFinded = this.users.find((user) => user.id === id);
    return userFinded;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFinded = this.users.find((user) => user.email === email);
    return userFinded;
  }

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (userIteration) => userIteration.id === user.id,
    );

    this.users[findIndex] = user;
    return user;
  }
}

export default UsersRepository;
