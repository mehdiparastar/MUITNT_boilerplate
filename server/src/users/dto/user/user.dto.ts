import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;

  @Expose()
  @ApiProperty({ isArray: true, type: 'string' })
  roles: string[];
}
