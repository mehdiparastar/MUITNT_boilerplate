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
  provider: string;

  @Expose()
  @ApiProperty()
  providerId: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  photo: string;

  @Expose()
  @ApiProperty({ isArray: true, type: 'string' })
  roles: string[];
}

export class UserIdDto {
  @Expose()
  @ApiProperty()
  id: number;
}

export class UserCompressDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  name: string;
}
