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

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionsRepo: Repository<Reaction>,
  ) {}

  async create(
    user: User,
    type: reactionTypeEnum,
    post: Post,
  ): Promise<Reaction> {
    // Create new Reaction

    const newReaction = this.reactionsRepo.create({
      creator: user,
      type,
      post,
    });

    return this.reactionsRepo.save(newReaction);
  }

  async findAll(): Promise<Reaction[]> {
    // Create new Post
    const result = await this.reactionsRepo.find({
      relations: { creator: true },
      where: {},
      order: { createdAt: 'DESC' },
    });

    return result;
  }

  async findOneById(id: number): Promise<Reaction> {
    if (!id) {
      throw new NotFoundException('reaction not found');
    }
    const find = await this.reactionsRepo.findOne({
      relations: { creator: true },
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('reaction not found');
    }
    return find;
  }

  async findOneByCreatorIdandPostId(
    creatorId: number,
    postId: number,
  ): Promise<Reaction> {
    if (!creatorId || !postId) {
      throw new NotFoundException('query is not correct');
    }
    const find = await this.reactionsRepo.findOne({
      relations: { creator: true, post: true },
      where: { post: { id: postId }, creator: { id: creatorId } },
    });
    if (!find) {
      throw new NotFoundException('reaction not found');
    }
    return find;
  }

  async findAllByPostId(postId: number): Promise<Reaction[]> {
    if (!postId) {
      throw new NotFoundException('post not found');
    }
    const find = await this.reactionsRepo.find({
      relations: { creator: true, post: true },
      where: { post: { id: postId } },
    });
    if (!find) {
      throw new NotFoundException('reaction not found');
    }
    return find;
  }

  async removeReaction(user: User, id: number): Promise<Reaction> {
    const reaction = await this.findOneById(id);
    if (!reaction) {
      throw new NotFoundException('reaction not found');
    }
    if (reaction.creator.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove reactions that are your own!',
      );
    }
    return this.reactionsRepo.remove(reaction);
  }

  whereRU(): string {
    return 'hello, you are in reactions of crud app.';
  }
}
