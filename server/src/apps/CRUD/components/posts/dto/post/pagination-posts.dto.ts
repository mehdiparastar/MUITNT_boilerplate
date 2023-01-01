import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PostDto } from './post.dto';

export class PaginationPostsDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => PostDto)
  @ApiProperty()
  data: PostDto;
}
