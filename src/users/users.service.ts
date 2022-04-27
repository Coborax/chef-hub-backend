import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username: username },
      relations: ['posts'],
    });
  }

  async create(
    name: string,
    username: string,
    plainPass: string,
  ): Promise<User> {
    return this.userRepository.save({
      name: name,
      username: username,
      password: await bcrypt.hash(plainPass, 10),
    });
  }
}
