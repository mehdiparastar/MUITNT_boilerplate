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
import { CrudPost } from './entities/post.entity';
import { CrudReaction } from './entities/reaction.entity';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(CrudReaction)
    private reactionsRepo: Repository<CrudReaction>,
  ) {}

  async create(
    user: User,
    type: reactionTypeEnum,
    post: CrudPost,
  ): Promise<CrudReaction> {
    // Create new Reaction
    const newReaction = this.reactionsRepo.create({
      creator: user,
      type,
      post,
    });

    return this.reactionsRepo.save(newReaction);
  }

  async findAll(): Promise<CrudReaction[]> {
    // Create new Post
    const result = await this.reactionsRepo.find({
      relations: { creator: true },
      where: {},
      order: { createdAt: 'DESC' },
    });

    return result;
  }

  async findOneById(id: number): Promise<CrudReaction> {
    if (!id) {
      throw new NotFoundException('reaction not found');
    }
    const find = await this.reactionsRepo.findOne({
      relations: { creator: true },
      where: { id },
    });
    return find;
  }

  async findOneByCreatorIdandPostId(
    creatorId: number,
    postId: number,
  ): Promise<CrudReaction> {
    if (!creatorId || !postId) {
      throw new NotFoundException('query is not correct');
    }
    const find = await this.reactionsRepo.findOne({
      relations: { creator: true, post: true },
      where: { post: { id: postId }, creator: { id: creatorId } },
    });
    return find;
  }

  async findAllByPostId(postId: number): Promise<CrudReaction[]> {
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

  async removeReaction(user: User, id: number): Promise<CrudReaction> {
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

  async update(
    user: User,
    id: number,
    newType: reactionTypeEnum,
  ): Promise<CrudReaction> {
    const reaction = await this.findOneById(id);
    if (!reaction) {
      throw new NotFoundException('reaction not found');
    }
    if (reaction.creator.id !== user.id) {
      throw new NotAcceptableException(
        'You only could update reactions that are your own!',
      );
    }
    Object.assign(reaction, { type: newType });
    return this.reactionsRepo.save(reaction);
  }

  whereRU(): string {
    return 'hello, you are in reactions of crud app.';
  }
}
