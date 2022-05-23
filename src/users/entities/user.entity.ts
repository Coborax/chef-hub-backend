import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Exclude } from 'class-transformer';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  username: string;
  @Column('text')
  name: string;
  @Column({ type: 'text', nullable: true })
  photoUrl: string;
  @Column('text')
  @Exclude()
  password: string;
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  @ManyToMany(() => User)
  @JoinTable()
  following: User[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
