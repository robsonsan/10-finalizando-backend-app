import FakeUsersRepository from '@modules/users/repositories/fakes/FakesUserRepository';
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvider = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John tre',
      email: 'johntre@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'John qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qui',
      email: 'johnqui@example.com',
      password: '123456',
    });

    const providers = await listProvider.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2, user3]);
  });
});
