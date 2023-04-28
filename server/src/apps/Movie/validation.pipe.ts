import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { filesize } from 'filesize';
@Injectable()
export class MovieFileValidationPipe implements PipeTransform {
  transform(files: Array<Express.Multer.File>, metadata: ArgumentMetadata) {
    // "file" is an object containing the file's attributes and metadata
    const K = 1000;
    const M = K * K;
    const KB = K * 1;
    const MB = K * KB;
    const maxSize = 500 * MB;
    // console.log(files, 'metadata')
    const invalidFilesSize = files.filter((file) => file.size > maxSize);
    if (invalidFilesSize.length > 0) {
      throw new BadRequestException(
        `Size Validation Failed. max size is: ${filesize(
          maxSize,
        )} ${invalidFilesSize
          .map((file) => `${file.originalname} => ${filesize(file.size)}`)
          .join(' and ')}`,
      );
    }

    const invalidFilesType = files.filter(
      (file) => file.mimetype !== 'video/mp4',
    );
    if (invalidFilesType.length > 0) {
      throw new BadRequestException(
        `Type Validation Failed. Only you Could upload mp4 files. Invalid files: ${invalidFilesType
          .map((file) => `${file.originalname}`)
          .join(' and ')}`,
      );
    }

    return files;
  }
}
