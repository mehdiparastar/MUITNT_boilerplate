import {
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagDto } from 'src/tags/dto/tag.dto';
import { UserDto } from 'src/users/dto/user/user.dto';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { MovieFileBuffer } from './entities/movieFileBuffer.entity';
import { MovieFileInfo } from './entities/movieFileInfo.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieFileInfo)
    private filesInfoRepo: Repository<MovieFileInfo>,
    @InjectRepository(MovieFileBuffer)
    private filesBufferRepo: Repository<MovieFileBuffer>,
  ) {}

  async uploads(
    files: Array<
      Express.Multer.File & {
        owner: UserDto;
        tags: TagDto[];
        private: boolean;
        fileHash: string;
      }
    >,
  ) {
    let savingRes: MovieFileInfo[] = [];

    for (const file of files) {
      const fileBuffer = this.filesBufferRepo.create({
        file: file.buffer,
        fileHash: file.fileHash,
      });
      await this.filesBufferRepo.save(fileBuffer);

      const fileInfo = this.filesInfoRepo.create({
        name: file.originalname,
        type: file.mimetype,
        fileBuffer: fileBuffer,
        size: file.size,
        fileHash: file.fileHash,
        private: file.private,
        tags: file.tags,
        owner: file.owner,
      });
      const save = await this.filesInfoRepo.save(fileInfo);
      savingRes.push(save);
    }

    return savingRes.map((item) => item.id);
  }

  async findAll(
    skip: number = 0,
    limit: number = 3,
    isPrivate: boolean,
    tagsFilter: number[] | undefined,
    user: User,
  ): Promise<{ data: MovieFileInfo[]; count: number }> {
    // Create new File
    const [result, total] = await this.filesInfoRepo.findAndCount({
      relations: {
        owner: true,
        tags: {
          creator: true,
        },
      },
      where:
        isPrivate === true
          ? {
              owner: { id: user.id },
              private: true,
              ...(!tagsFilter ||
              JSON.stringify(tagsFilter) === JSON.stringify([])
                ? {}
                : { tags: { id: In(tagsFilter) } }),
            }
          : {
              private: false,
              ...(!tagsFilter ||
              JSON.stringify(tagsFilter) === JSON.stringify([])
                ? {}
                : { tags: { id: In(tagsFilter) } }),
            },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOneById(id: number): Promise<MovieFileInfo> {
    if (!id) {
      throw new NotFoundException('file not found');
    }
    const find = await this.filesInfoRepo.findOne({
      where: { id },
      relations: { owner: true, fileBuffer: true }, //['author'],
    });
    if (!find) {
      throw new NotFoundException('file not found');
    }
    return find;
  }

  async removeFile(user: User, id: number): Promise<MovieFileBuffer> {
    const file = await this.findOneById(id);
    if (!file) {
      throw new NotFoundException('file not found');
    }
    if (file.owner.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove files that are your own!',
      );
    }
    return this.filesBufferRepo.remove(file.fileBuffer);
  }

  whereRU(): string {
    return 'hello, you are in files of crud app.';
  }
}
