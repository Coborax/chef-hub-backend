import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Like } from 'typeorm';
import { IUserRepo } from './user-repo.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepo,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username: username },
      relations: ['posts', 'following'],
    });
  }

  async search(searchTerm: string): Promise<User[] | undefined> {
    return this.userRepository.find({
      where: { username: Like('%' + searchTerm + '%') },
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

  async addFollower(username: string, followerUsername: string) {
    const user = await this.findOne(username);
    const follower = await this.findOne(followerUsername);

    user.following.push(follower);

    await this.userRepository.save(user);
  }
}
