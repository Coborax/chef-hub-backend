import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './post.provider';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../users/user.provider';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PostsController],
  imports: [DatabaseModule, UsersModule],
  providers: [...postProviders, PostsService],
  exports: [...postProviders],
})
export class PostsModule {}
