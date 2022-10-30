import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @Transform(({ obj }: { obj: UserDto }) =>
    Object.keys(obj.roles).filter((item) => obj.roles[item] === true),
  )
  @ApiProperty({ isArray: true, type: 'string' })
  roles: string[];
}
