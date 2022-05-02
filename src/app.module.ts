import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { doc } from 'prettier';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'content'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
