import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MovieFileDto } from './movie.dto';

export class PaginationMovieFilesDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => MovieFileDto)
  @ApiProperty()
  data: MovieFileDto;
}
