import { Test, TestingModule } from '@nestjs/testing';
import { Connection, EntityNotFoundError } from 'typeorm';
import { mocked } from 'ts-jest/utils';

import { Consent } from 'entities/consent.entity';
import { User } from 'entities/user.entity';
import { Event } from 'entities/event.entity';
import { EventsController } from './events.controller';

describe('UsersController', () => {
  const defaultUser = {
    email: 'test@gmail.com',
    consents: [
      Consent.createEmailConsent(false),
      Consent.createSmsConsent(false),
    ],
  };

  const mockedTransactionalManager = mocked({
    findOneOrFail: async (entity, options) => {
      if (options.where.id === 'test') {
        return defaultUser;
      } else {
        throw new EntityNotFoundError(User, options.where);
      }
    },
    save: async (entity, data) => {
      return data;
    },
  });

  jest.spyOn(mockedTransactionalManager, 'save');

  const mockedConnection = {
    transaction: async (cb) => {
      return cb(mockedTransactionalManager);
    },
  };

  let eventsController: EventsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: Connection, useFactory: () => mockedConnection }],
    }).compile();

    eventsController = module.get(EventsController);
  });

  it('should create an event and update the user consents', async () => {
    const event = {
      userId: 'test',
      consents: [Consent.createEmailConsent(true)],
    };

    await eventsController.createEvent(event);

    const updatedUser = {
      ...defaultUser,
      consents: [
        Consent.createEmailConsent(true),
        Consent.createSmsConsent(false),
      ],
    };

    expect(mockedTransactionalManager.save.mock.calls).toEqual([
      [
        Event,
        {
          user: updatedUser,
          consents: event.consents,
        },
      ],
      [User, updatedUser],
    ]);
  });

  it('should throw the correct exception if user is not found', async () => {
    const event = {
      userId: 'test_not_found',
      consents: [Consent.createEmailConsent(true)],
    };

    await expect(eventsController.createEvent(event)).rejects.toThrow(
      'User not found for given userId',
    );
  });
});
