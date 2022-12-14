import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { reactionTypeEnum } from 'src/enum/reactionType.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { Post } from './entities/post.entity';
import { Reaction } from './entities/reaction.entity';
import { ReactionsService } from './reactions.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepo: Repository<Post>,
    private readonly reactionsService: ReactionsService,
  ) { }

  async create(user: User, title: string, caption: string): Promise<Post> {
    // Create new Post

    const newPost = this.postsRepo.create({
      author: user,
      title,
      caption,
    });

    return this.postsRepo.save(newPost);
  }

  async findAll(
    skip: number = 0,
    limit: number = 3,
  ): Promise<{ data: Post[]; count: number }> {
    // Create new Post
    const [result, total] = await this.postsRepo.findAndCount({
      relations: ['author', 'reactions'],
      where: {},
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOneById(id: number): Promise<Post> {
    if (!id) {
      throw new NotFoundException('post not found');
    }
    const find = await this.postsRepo.findOne({
      relations: { author: true, reactions: { creator: true } }, //['author', 'reactions'],
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('post not found');
    }
    return find;
  }

  async removePost(user: User, id: number): Promise<Post> {
    const post = await this.findOneById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    if (post.author.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove posts that are your own!',
      );
    }
    return this.postsRepo.remove(post);
  }

  async update(user: User, id: number, attrs: UpdatePostDto): Promise<Post> {
    const post = await this.findOneById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    if (post.author.id !== user.id) {
      throw new NotAcceptableException(
        'You only could update posts that are your own!',
      );
    }
    Object.assign(post, attrs);
    return this.postsRepo.save(post);
  }

  async like(user: User, postId: number): Promise<Partial<{ [key in reactionTypeEnum]: number }>> {
    const post = await this.findOneById(postId);
    if (!post) {
      throw new NotFoundException('post not found');
    }

    const reaction = await this.reactionsService.findOneByCreatorIdandPostId(user.id, postId)

    if (!reaction) {
      await this.reactionsService.create(
        user,
        reactionTypeEnum.like,
        post,
      );
    }
    else {
      if (reaction.type === reactionTypeEnum.like) {
        await this.reactionsService.removeReaction(user, reaction.id)
      }
      else {
        await this.reactionsService.update(user, reaction.id, reactionTypeEnum.like)
      }
    }

    const reactions = (await this.findOneById(postId)).reactions

    return reactions.reduce((p, c) => ({ ...p, [c.type]: (p[c.type] || 0) + 1 }), {})
  }

  async dislike(user: User, postId: number): Promise<Partial<{ [key in reactionTypeEnum]: number }>> {
    const post = await this.findOneById(postId);
    if (!post) {
      throw new NotFoundException('post not found');
    }

    const reaction = await this.reactionsService.findOneByCreatorIdandPostId(user.id, postId)

    if (!reaction) {
      await this.reactionsService.create(
        user,
        reactionTypeEnum.dislike,
        post,
      );
    }
    else {
      if (reaction.type === reactionTypeEnum.dislike) {
        await this.reactionsService.removeReaction(user, reaction.id)
      }
      else {
        await this.reactionsService.update(user, reaction.id, reactionTypeEnum.dislike)
      }
    }

    const reactions = (await this.findOneById(postId)).reactions

    return reactions.reduce((p, c) => ({ ...p, [c.type]: (p[c.type] || 0) + 1 }), {})
  }

  whereRU(): string {
    return 'hello, you are in posts of crud app.';
  }
}
