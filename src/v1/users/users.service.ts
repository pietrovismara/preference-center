import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryFailedError, Repository } from 'typeorm';

import { User } from 'entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  getById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['consents'],
    });
  }

  getAll() {
    return this.userRepository.find({ relations: ['consents'] });
  }

  async create(user: User) {
    try {
      const result = await this.connection.manager.save(user);
      return result;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new ConflictException(
          `User already exists for email ${user.email}`,
        );
      } else {
        throw e;
      }
    }
  }

  async deleteById(id: string) {
    const result = await this.userRepository.delete(id);
    return !!result.affected;
  }
}
