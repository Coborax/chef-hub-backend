import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { use } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private photoRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.photoRepository.findOneBy({
      username: username,
    });
  }
}
