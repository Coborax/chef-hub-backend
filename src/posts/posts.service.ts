import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

class Photo {}

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findUserPosts(username: string): Promise<Post[]> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['posts'],
    });

    return user.posts;
  }
}
