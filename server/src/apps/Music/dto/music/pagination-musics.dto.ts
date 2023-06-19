import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MusicFileDto } from './music.dto';

export class PaginationMusicFilesDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => MusicFileDto)
  @ApiProperty()
  data: MusicFileDto;
}
