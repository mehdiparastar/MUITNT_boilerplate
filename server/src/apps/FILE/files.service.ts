import {
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagDto } from 'src/tags/dto/tag.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { UserDto } from 'src/users/dto/user/user.dto';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepo: Repository<File>,
  ) { }

  async uploads(files: Array<Express.Multer.File & {
    owner: UserDto,
    tags: TagDto[],
    private: boolean,
    fileHash: string
  }>) {
    const newFiles = files.map(file => this.filesRepo.create({
      name: file.originalname,
      type: file.mimetype,
      file: file.buffer,
      size: file.size,
      fileHash: file.fileHash,
      private: file.private,
      tags: file.tags,
      owner: file.owner
    }))

    const savingRes = await Promise.all(newFiles.map(newFile => this.filesRepo.save(newFile)))
    return savingRes.map(item => item.id)
  }


  async findAll(skip: number = 0, limit: number = 3, isPrivate: boolean, tagsFilter: number[] | undefined, user: User): Promise<{ data: File[]; count: number }> {
    // Create new File
    const [result, total] = await this.filesRepo.findAndCount({
      relations: {
        owner: true,
        tags: {
          creator: true
        }
      },
      where:
        isPrivate === true ?
          {
            owner: { id: user.id },
            private: true,
            ...((!tagsFilter || JSON.stringify(tagsFilter) === JSON.stringify([])) ? {} : { tags: { id: In(tagsFilter) } })
          }
          :
          {
            private: false,
            ...((!tagsFilter || JSON.stringify(tagsFilter) === JSON.stringify([])) ? {} : { tags: { id: In(tagsFilter) } })
          }
      ,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOneById(id: number): Promise<File> {
    if (!id) {
      throw new NotFoundException('file not found');
    }
    const find = await this.filesRepo.findOne({
      relations: { owner: true }, //['author'],
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('file not found');
    }
    return find;
  }

  async removeFile(user: User, id: number): Promise<File> {
    const file = await this.findOneById(id);
    if (!file) {
      throw new NotFoundException('file not found');
    }
    if (file.owner.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove files that are your own!',
      );
    }
    return this.filesRepo.remove(file);
  }

  whereRU(): string {
    return 'hello, you are in files of crud app.';
  }
}
