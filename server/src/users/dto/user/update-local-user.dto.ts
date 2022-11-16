import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateLocalUserDto } from './create-local-user.dto';

export class UpdateLocalUserDto extends PartialType(CreateLocalUserDto) {
  @Expose()
  @ApiProperty()
  refreshToken?: string;

  @Expose()
  @ApiProperty({ isArray: true, type: 'string' })
  roles?: string[];
}
