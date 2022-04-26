import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
