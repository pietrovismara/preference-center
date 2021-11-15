import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { Connection, EntityNotFoundError } from 'typeorm';

import { CreateEventDto } from './event.dto';
import { User } from 'entities/user.entity';
import { Event } from 'entities/event.entity';
import { Consent } from 'entities/consent.entity';

@Controller('v1/events')
export class EventsController {
  constructor(private readonly connection: Connection) {}

  @Post('/')
  async createEvent(@Body() eventDto: CreateEventDto): Promise<User> {
    try {
      const result = await this.connection.transaction(
        async (transactionalManager) => {
          const user = await transactionalManager.findOneOrFail(User, {
            where: { id: eventDto.userId },
            relations: ['consents', 'events'],
          });

          for (const consent of eventDto.consents) {
            const userConsent = user.consents.find(
              (c) => c.type === consent.type,
            );

            if (userConsent) {
              userConsent.enabled = consent.enabled;
            } else {
              user.consents.push(Consent.createConsentByType(consent.type));
            }
          }

          const event = new Event();
          event.user = user;
          event.consents = eventDto.consents;
          await transactionalManager.save(Event, event);

          const result = await transactionalManager.save(User, user);
          return result;
        },
      );

      return result;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found for given userId');
      } else {
        throw e;
      }
    }
  }
}
