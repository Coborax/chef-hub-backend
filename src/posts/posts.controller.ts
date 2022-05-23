import {
  Controller,
  Get,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
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
  @Get(':id')
  find(@Param('id') id: number) {
    return this.postsService.find(id);
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
    console.log(file);
    return this.postsService.create(createDto, file.buffer, req.user.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.postsService.findPostById(id);
  }
}
