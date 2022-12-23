import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserDto } from '../user/user.dto';
import { PermissionRequestDto } from './permission-request.dto';

export class PaginationPermissionRequestDto {
  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @Type(() => PermissionRequestDto)
  @ApiProperty()
  data: PermissionRequestDto;
}
