import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { appNameEnum } from 'src/enum/appName.enum';
import { reactionTypeEnum } from 'src/enum/reactionType.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepo: Repository<Tag>,
  ) {}

  async create(user: User, tag: string, appName: appNameEnum): Promise<Tag> {
    // Create new Tag

    const newTag = this.tagsRepo.create({
      creator: user,
      tag,
      appName,
    });

    return this.tagsRepo.save(newTag);
  }

  async findAll(appName: appNameEnum): Promise<Tag[]> {
    // Create new Tag
    if (appName) {
      const result = await this.tagsRepo.find({
        relations: {
          creator: true,
        },
        where: { appName: appName },
        order: { createdAt: 'DESC' },
      });

      return result;
    }
    return [];
  }

  async findOneById(id: number): Promise<Tag> {
    if (!id) {
      throw new NotFoundException('tag not found');
    }
    const find = await this.tagsRepo.findOne({
      relations: { creator: true },
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('tag not found');
    }
    return find;
  }

  async removeTag(user: User, id: number): Promise<Tag> {
    const tag = await this.findOneById(id);
    if (!tag) {
      throw new NotFoundException('tag not found');
    }
    if (tag.creator.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove tags that are your own!',
      );
    }
    return this.tagsRepo.remove(tag);
  }

  whereRU(): string {
    return 'hello, you are in tags.';
  }
}
