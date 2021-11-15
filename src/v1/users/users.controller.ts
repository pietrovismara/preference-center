import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { Consent } from 'entities/consent.entity';
import { User } from 'entities/user.entity';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getById(id);
  }

  @Get('/')
  async getUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Post('/')
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = userDto.email;
    user.consents = [Consent.createEmailConsent(), Consent.createSmsConsent()];
    return this.usersService.create(user);
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ status: string }> {
    const deleted = await this.usersService.deleteById(id);

    if (deleted) {
      return { status: 'success' };
    } else {
      throw new NotFoundException();
    }
  }
}
