import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDTO } from '../dto/create-post.dto';
import { IPost } from '../interfaces/post.interface';
import { Model } from 'mongoose';
import { UpdatePostDTO } from '../dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private postModel: Model<IPost>) {}

  async addPost(createPostDTO: CreatePostDTO): Promise<IPost> {
    const newPost = new this.postModel(createPostDTO);
    return await newPost.save();
  }

  async updatePost(
    postId: string,
    updatePostDTO: UpdatePostDTO,
  ): Promise<IPost> {
    const existingPost = await this.postModel.findByIdAndUpdate(
      postId,
      updatePostDTO,
      { new: true },
    );

    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found.`);
    }
    return existingPost;
  }

  async getAllPosts(): Promise<IPost[]> {
    const postData = await this.postModel.find();

    if (!postData) {
      throw new NotFoundException(' Posts data not found!');
    }
    return postData;
  }

  async getPost(postId: string): Promise<IPost> {
    const existingPost = await this.postModel.findById(postId).exec();

    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found.`);
    }
    return existingPost;
  }

  async deletePost(postId: string): Promise<IPost> {
    const deletePost = await this.postModel.findByIdAndDelete(postId);

    if (!deletePost) {
      throw new NotFoundException(`Post #${postId} not found.`);
    }
    return deletePost;
  }
}
