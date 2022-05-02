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
  @ManyToMany(() => User)
  @JoinTable()
  following: User[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
