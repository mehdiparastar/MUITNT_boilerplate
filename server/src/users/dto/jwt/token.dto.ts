import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JWTTokenDto {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}
