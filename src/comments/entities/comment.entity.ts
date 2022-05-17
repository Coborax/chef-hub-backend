import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  msg: string;
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
