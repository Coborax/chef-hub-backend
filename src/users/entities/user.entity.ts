import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

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
  password: string;
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
  @ManyToMany(() => User)
  @JoinTable()
  following: User[];
}
