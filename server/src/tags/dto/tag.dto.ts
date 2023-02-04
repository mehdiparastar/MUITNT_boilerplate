import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TagDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  tag: string;
}