import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as AxiosPost,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dto/post/create-post.dto';
import { PaginationPostsDto } from './dto/post/pagination-posts.dto';
import { PostDto } from './dto/post/post.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { ReactionDto } from './dto/reaction/reaction.dto';
import { CrudPost } from './entities/post.entity';
import { CrudReaction } from './entities/reaction.entity';
import { PostsService } from './posts.service';

@Controller('crud_app/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @AxiosPost('create-post')
  @UseGuards(AccessTokenGuard)
  @Serialize(PostDto)
  async createPermissionRequest(
    @CurrentUser() user: User,
    @Body() body: CreatePostDto,
  ): Promise<CrudPost> {
    return this.postsService.create(user, body.title, body.caption);
  }

  @Get('all-posts')
  @UseGuards(AccessTokenGuard)
  @Serialize(PaginationPostsDto)
  async getAllPosts(
    @CurrentUser() user: User,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    return await this.postsService.findAll(skip, limit);
  }

  @Get('post/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(PostDto)
  async getPost(@CurrentUser() user: User, @Param('id') id: string) {
    return await this.postsService.findOneById(parseInt(id));
  }

  @Delete('delete-post/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(PostDto)
  removePReq(@CurrentUser() user: User, @Param('id') id: string) {
    return this.postsService.removePost(user, parseInt(id));
  }

  @Patch('update-post/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(PostDto)
  updatePost(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() body: UpdatePostDto,
  ): Promise<CrudPost> {
    return this.postsService.update(user, parseInt(id), body);
  }

  @Patch('like-post/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(ReactionDto)
  likePost(@CurrentUser() user: User, @Param('id') id: string) {
    return this.postsService.like(user, parseInt(id));
  }

  @Patch('dislike-post/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(ReactionDto)
  dislikePost(@CurrentUser() user: User, @Param('id') id: string) {
    return this.postsService.dislike(user, parseInt(id));
  }

  @Get()
  //   @UseGuards(AccessTokenGuard)
  whereRU(): string {
    return this.postsService.whereRU();
  }
}
