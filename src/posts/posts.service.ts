import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { IUserRepo } from '../users/user-repo.interface';
import { IPostRepo } from './post-repo.interface';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: IPostRepo,
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepo,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
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

  async create(
    createDto: CreatePostDto,
    buffer: Buffer,
    mime: string,
    username: string,
  ): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    const filename = username + uuid() + '.' + mime.replace('image/', '');
    const path = './content/' + filename;
    fs.createWriteStream(path).write(buffer);

    return this.postRepository.save({
      title: createDto['title'],
      desc: createDto['desc'],
      user: user,
      photoUrl: 'http://192.168.228.110:3000/' + filename,
    });
  }
}
