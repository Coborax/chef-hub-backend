import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { IPostRepo } from '../posts/post-repo.interface';
import { IUserRepo } from '../users/user-repo.interface';
import { ICommentRepo } from './comment-repo.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: ICommentRepo,
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepo,
    @Inject('POST_REPOSITORY')
    private postRepository: IPostRepo,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findOne({
      where: { id: createCommentDto.userId },
    });

    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId },
    });

    return this.commentsRepository.save({
      msg: createCommentDto.msg,
      user,
      post,
    });
  }
}
