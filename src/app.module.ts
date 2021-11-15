import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Consent } from 'entities/consent.entity';
import { User } from 'entities/user.entity';
import { Event } from 'entities/event.entity';
import { V1Module } from 'v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port:
        typeof process.env.TYPEORM_PORT === 'number'
          ? process.env.TYPEORM_PORT
          : parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DB,
      entities: [User, Event, Consent],
      synchronize: false,
    }),
    V1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
