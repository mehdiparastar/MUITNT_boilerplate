import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RoomDtoWithoutMessages } from './room.dto';

export class PaginationPostsDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => RoomDtoWithoutMessages)
  @ApiProperty()
  data: RoomDtoWithoutMessages[];
}
