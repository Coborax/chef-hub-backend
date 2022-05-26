import { Comment } from './entities/comment.entity';

export interface ICommentRepo {
  save(param: { msg: string; post: any; user: any }): Comment;
}
