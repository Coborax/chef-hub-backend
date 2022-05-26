import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

export interface IPostRepo {
  find(): Promise<Post[]>;
  find(param: { where: any[]; relations: string[] }): Promise<Post[]>;
  findOne(param: { where: { id: number }; relations: string[] }): any;
  findOne(param: { where: { id: number } }): any;
  save(param: {
    photoUrl: string;
    title: string;
    user: User;
    desc: string;
  }): Post;
}
