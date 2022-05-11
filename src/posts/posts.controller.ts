import {
  Controller,
  Get,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    return this.postsService.findUserPosts(req.user.username);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get('feed')
  findFeed(@Request() req) {
    return this.postsService.findPostsFromFollowers(req.user.username);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  uploadFile(
    @Body() createDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.postsService.create(
      createDto,
      file.filename,
      file.buffer,
      req.user.username,
    );
  }
}
