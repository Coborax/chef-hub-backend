import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './post.provider';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../users/user.provider';

@Module({
  controllers: [PostsController],
  imports: [DatabaseModule],
  providers: [...postProviders, ...userProviders, PostsService],
})
export class PostsModule {}
