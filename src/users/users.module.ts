import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService, ...userProviders],
  controllers: [UsersController],
})
export class UsersModule {}
