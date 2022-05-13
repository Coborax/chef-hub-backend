import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(
      createUserDto.name,
      createUserDto.username,
      createUserDto.password,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('follow/:username')
  follow(@Param('username') username: string, @Request() req) {
    return this.usersService.addFollower(req.user.username, username);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  get(@Request() req) {
    return this.usersService.findOne(req.user.username);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
}
