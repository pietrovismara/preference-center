import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consent } from 'entities/consent.entity';
import { Event } from 'entities/event.entity';
import { User } from 'entities/user.entity';
import { EventsController } from './events/events.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Consent, Event])],
  controllers: [UsersController, EventsController],
  providers: [UsersService],
})
export class V1Module {}
