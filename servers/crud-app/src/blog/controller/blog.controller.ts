import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { BlogService } from '../service/blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/post')
  async addPost(
    @Res() response: Response,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    try {
      const newPost = await this.blogService.addPost(createPostDTO);

      return response.status(HttpStatus.CREATED).json({
        message: `Post has been created successfully`,
        newPost,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: `Error: Post not created!`,
        error: 'Bad Request',
      });
    }
  }

  @Put('/post/:id')
  async updatePost(
    @Res() response: Response,
    @Param('id') postId: string,
    @Body() updatePostDTO: UpdatePostDTO,
  ) {
    try {
      const existingPost = await this.blogService.updatePost(
        postId,
        updatePostDTO,
      );

      return response.status(HttpStatus.OK).json({
        message: `Post has been successfully updated`,
        existingPost,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/posts')
  async getPosts(@Res() response: Response) {
    try {
      const postData = await this.blogService.getAllPosts();
      return response.status(HttpStatus.OK).json({
        message: 'All posts data found successfully',
        postData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/post/:id')
  async getPost(@Res() response, @Param('id') postId: string) {
    try {
      const existingPost = await this.blogService.getPost(postId);
      return response.status(HttpStatus.OK).json({
        message: 'Post found successfully',
        existingPost,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('post/:id')
  async deletePost(@Res() response: Response, @Param('id') postId: string) {
    try {
      const deletedPost = await this.blogService.deletePost(postId);
      return response.status(HttpStatus.OK).json({
        message: 'Post deleted successfully',
        deletedPost,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
