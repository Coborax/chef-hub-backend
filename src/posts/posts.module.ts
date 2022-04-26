import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './post.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [PostsController],
  imports: [DatabaseModule],
  providers: [...postProviders, PostsService],
})
export class PostsModule {}
