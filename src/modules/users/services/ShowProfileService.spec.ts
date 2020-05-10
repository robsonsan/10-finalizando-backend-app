import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakesUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const showedUser = await showProfile.execute({ user_id: user.id });

    expect(showedUser.name).toBe(user.name);
    expect(showedUser.email).toBe(user.email);
  });

  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
