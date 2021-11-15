import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Consent } from 'entities/consent.entity';

describe('UsersController', () => {
  const mockedUsersService = {
    create: jest.fn(),
    deleteById: async (id) => id === 'test',
  };

  let usersService: UsersService;
  let usersController: UsersController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useFactory: () => mockedUsersService },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersController = module.get(UsersController);
  });

  it('should create a user setting the correct fields', async () => {
    await usersController.createUser({
      email: 'test@gmail.com',
    });

    expect(usersService.create).toBeCalledWith({
      email: 'test@gmail.com',
      consents: [Consent.createEmailConsent(), Consent.createSmsConsent()],
    });
  });

  it('should return the correct response on successful user deletion', async () => {
    const response = await usersController.deleteUser('test');
    expect(response).toEqual({ status: 'success' });
  });

  it('should throw on failed user deletion', async () => {
    await expect(usersController.deleteUser('foobar')).rejects.toThrow(
      'Not Found',
    );
  });
});
