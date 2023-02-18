import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RoomIntendedParticipantDto } from './intended-participant.dto';

export class PaginationPostsDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => RoomIntendedParticipantDto)
  @ApiProperty()
  data: RoomIntendedParticipantDto[];
}
