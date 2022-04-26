import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

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
}
