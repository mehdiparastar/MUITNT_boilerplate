import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { MovieFileBuffer } from './entities/movieFileBuffer.entity';
import { MovieFileInfo } from './entities/movieFileInfo.entity';
import * as fs from 'fs';
import * as path from 'path';

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
        fileHash: string;
        fileInfoId: number;
        segmentNo: number;
      }
    >,
  ) {
    const savingRes: MovieFileBuffer[] = [];
    for (const file of files) {
      const fileInfo = await this.findOneMovieFileInfoById(file.fileInfoId);

      const uploadPath = path.join(process.cwd(), '..', 'uploads'); // Define your upload directory

      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }

      const fileName = `${file.fileInfoId}`; // Define a unique file name

      const filePath = path.join(
        uploadPath,
        `${fileName}.part${file.segmentNo}`,
      );

      // Write the chunk to the file system
      fs.writeFileSync(filePath, Buffer.from(file.buffer));

      if (file.segmentNo === fileInfo.totalSegments - 1) {
        // If this is the last chunk, all chunks have been uploaded
        // Reassemble the chunks and perform any necessary operations on the complete file
        const completeFilePath = path.join(uploadPath, fileName);

        const writeStream = fs.createWriteStream(completeFilePath, {
          flags: 'a',
        });

        for (let i = 0; i < fileInfo.totalSegments; i++) {
          const partFilePath = path.join(uploadPath, `${fileName}.part${i}`);
          const chunkBuffer = fs.readFileSync(partFilePath);
          writeStream.write(chunkBuffer);
          fs.unlinkSync(partFilePath); // Remove the individual chunk file
        }

        writeStream.end();

        // Perform any additional operations with the complete file, such as saving it to the database

        // return { message: 'File upload completed successfully' };
      }

      // Return a response indicating the successful upload of the chunk
      // return { message: `Chunk ${segmentNo + 1} uploaded successfully` };

      const fileBuffer = this.filesBufferRepo.create({
        file: file.buffer,
        fileHash: file.fileHash,
        filesInfo: [fileInfo],
        segmentNo: file.segmentNo,
      });

      const save = await this.filesBufferRepo.save(fileBuffer);
      savingRes.push(save);
    }

    return savingRes.map((item) => ({
      id: item.id,
      segmentNo: item.segmentNo,
    }));
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
      await this.filesBufferRepo.delete({ fileHash: fileInfo.fileHash });
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

  async findMovieFileSegments(user: User, fileHash: string) {
    if (!fileHash) {
      throw new NotFoundException('file not found');
    }
    const find = await this.filesBufferRepo.find({
      where: { fileHash: fileHash },
      order: { segmentNo: 'ASC' },
    });
    if (!find) {
      throw new NotFoundException('file not found');
    }
    return find;
  }

  whereRU(): string {
    return 'hello, you are in movies app.';
  }
}
