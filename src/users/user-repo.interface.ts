import { User } from './entities/user.entity';

export interface IUserRepo {
  findOne(param: {
    where: { username: string };
    relations: string[];
  }): Promise<User>;
  findOne(param: { where: { username: string } }): Promise<User>;
  findOne(param: { where: { id: number } }): any;
  find(param: { where: { username: any } }): Promise<User[]>;
  save(param: {
    password: string;
    name: string;
    username: string;
  }): Promise<User>;
}
