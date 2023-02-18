import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MessageDto } from './message.dto';

export class PaginationMessagesDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => MessageDto)
  @ApiProperty()
  data: MessageDto[];
}
