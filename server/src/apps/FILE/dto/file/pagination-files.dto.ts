import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FileDto } from './file.dto';

export class PaginationFilesDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => FileDto)
  @ApiProperty()
  data: FileDto;
}
