import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(files: Array<Express.Multer.File>, metadata: ArgumentMetadata) {
        // "file" is an object containing the file's attributes and metadata
        const K = 1000;
        const M = K * K
        const KB = K * 1;
        const MB = K * KB
        const maxSize = 100 * MB
        // console.log(files, 'metadata')
        const invalidFiles = files.filter(file => file.size > maxSize)
        if (invalidFiles.length > 0) {
            console.log(`Size Validation Failed. max size is: ${(maxSize / M).toFixed(2)}MB ${invalidFiles.map(file => `${file.originalname} => ${(file.size / K).toFixed(2)}KB`).join(' and \n')}`)
            throw new BadRequestException(`Size Validation Failed. max size is: ${(maxSize / M).toFixed(2)}MB ${invalidFiles.map(file => `${file.originalname} => ${(file.size / K).toFixed(2)}KB`).join(' and ')}`);
        }
        return files
    }
}