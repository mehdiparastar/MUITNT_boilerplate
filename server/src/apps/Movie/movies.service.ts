import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { MovieFileInfo } from './entities/movieFileInfo.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private uploadPath: string;
  constructor(
    @InjectRepository(MovieFileInfo)
    private filesInfoRepo: Repository<MovieFileInfo>,
    protected configService: ConfigService<IconfigService>,
  ) {
    this.uploadPath = path.join(process.cwd(), '..', 'uploads', 'movies'); // Define your upload directory
  }

  async uploads(
    files: Array<
      Express.Multer.File & {
        fileHash: string;
        fileInfoId: number;
        segmentNo: number;
      }
    >,
    user: User,
  ) {
    try {
      const savingRes = [];
      for (const file of files) {
        const fileInfo = await this.findOneMovieFileInfoById(file.fileInfoId);

        // Create the uploads directory if it doesn't exist
        if (!fs.existsSync(this.uploadPath)) {
          fs.mkdirSync(this.uploadPath);
        }

        const fileName = `${file.fileInfoId}`; // Define a unique file name

        const filePath = path.join(
          this.uploadPath,
          `${fileName}.part${file.segmentNo}`,
        );

        // Write the chunk to the file system
        fs.writeFileSync(filePath, Buffer.from(file.buffer));

        if (file.segmentNo === fileInfo.totalSegments - 1) {
          // If this is the last chunk, all chunks have been uploaded
          // Reassemble the chunks and perform any necessary operations on the complete file
          const completeFilePath = path.join(this.uploadPath, fileName);

          const writeStream = fs.createWriteStream(completeFilePath, {
            flags: 'a',
          });

          for (let i = 0; i < fileInfo.totalSegments; i++) {
            const partFilePath = path.join(
              this.uploadPath,
              `${fileName}.part${i}`,
            );
            const chunkBuffer = fs.readFileSync(partFilePath);
            writeStream.write(chunkBuffer);
            fs.unlinkSync(partFilePath); // Remove the individual chunk file
          }

          writeStream.end();

          await this.filesInfoRepo.save({
            ...fileInfo,
            hlsUrl: `http://localhost:${
              this.configService.get<number>('NMS_HTTP_PORT') || 8000
            }/movies/${fileName}`,
            uploadedComplete: true,
            streamable: true,
          });
        }

        savingRes.push({ segmentNo: file.segmentNo });
      }

      return savingRes.map((item, index) => ({
        segmentNo: item.segmentNo,
      }));
    } catch (error) {
      console.log(error);
    }
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

  async findOneMovieFileInfoById(id: number): Promise<MovieFileInfo> {
    if (!id) {
      throw new NotFoundException('file not found');
    }
    const find = await this.filesInfoRepo.findOne({
      where: { id },
      relations: { owner: true }, //['author'],
    });
    if (!find) {
      throw new NotFoundException('file not found');
    }
    return find;
  }

  async removeFile(user: User, id: number): Promise<MovieFileInfo> {
    const fileInfo = await this.findOneMovieFileInfoById(id);
    if (!fileInfo) {
      throw new NotFoundException('file not found');
    }
    if (fileInfo.owner.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove files that are your own!',
      );
    }
    const removeFileInfo = await this.filesInfoRepo.remove(fileInfo);

    const filesCount = await this.filesInfoRepo.count({
      where: { fileHash: fileInfo.fileHash },
    });
    if (filesCount === 0) {
      fs.unlinkSync(path.join(this.uploadPath, `${id}`)); // Remove the file
      fs.rmSync(path.join(this.uploadPath, 'streams', `${id}`), {
        recursive: true,
        force: true,
      });
    }
    return removeFileInfo;
  }

  async createMovieFilesInfo(user: User, infos: Partial<MovieFileInfo>[]) {
    const newRecords = infos.map((info) =>
      this.filesInfoRepo.create({ ...info, owner: user }),
    );
    const save = await this.filesInfoRepo.save(newRecords);
    return save;
  }

  async setUploadingFileAsCompleted(user: User, id: number) {
    const find = await this.filesInfoRepo.findOne({ where: { id: id } });
    find.uploadedComplete = true;
    const save = await this.filesInfoRepo.save(find);
    return save;
  }

  whereRU(): string {
    return 'hello, you are in movies app.';
  }
}
