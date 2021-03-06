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
  Param,
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

  @UseGuards(AuthGuard('jwt'))
  @Get('get/:id')
  find(@Param('id') id: number) {
    return this.postsService.find(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get('feed')
  findFeed(@Request() req) {
    return this.postsService.findPostsFromFollowers(req.user.username);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get('like/:id')
  like(@Request() req, @Param('id') id: number) {
    return this.postsService.like(req.user.username, id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get('unlike/:id')
  unlike(@Request() req, @Param('id') id: number) {
    return this.postsService.unlike(req.user.username, id);
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
      file.buffer,
      file.mimetype,
      req.user.username,
    );
  }
}
