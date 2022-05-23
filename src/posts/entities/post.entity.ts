import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('text')
  desc: string;
  @Column('text')
  photoUrl: string;
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
