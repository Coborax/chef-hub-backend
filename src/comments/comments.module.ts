import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsGateway } from './comments.gateway';
import { commentsProvider } from './comments.provider';
import { postProviders } from '../posts/post.provider';
import { userProviders } from '../users/user.provider';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [DatabaseModule, UsersModule, PostsModule],
  providers: [...commentsProvider, CommentsGateway, CommentsService],
})
export class CommentsModule {}
