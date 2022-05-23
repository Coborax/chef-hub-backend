import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { use } from 'passport';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

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
    return this.postRepository.find({
      relations: ['user'],
    });
  }

  find(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user'],
    });
  }

  async findUserPosts(username: string): Promise<Post[]> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['posts'],
    });

    return user.posts;
  }

  async findPostsFromFollowers(username: string): Promise<Post[]> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['following'],
    });

    const whereArr = user.following.map((user) => {
      return { user: user };
    });

    return await this.postRepository.find({
      where: whereArr,
      relations: ['user'],
    });
  }

  async findPostById(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }

  async create(
    createDto: CreatePostDto,
    buffer: Buffer,
    username: string,
  ): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    const filename = username + uuid();
    const path = './content/' + filename;
    fs.createWriteStream(path).write(buffer);

    console.log(createDto);

    return this.postRepository.save({
      title: createDto['title'],
      desc: createDto['desc'],
      user: user,
      photoUrl: 'http://localhost:3000/' + filename,
    });
  }
}
