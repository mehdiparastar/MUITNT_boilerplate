import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JWTTokenDto {
  @Expose()
  @ApiProperty()
  access_token: string;
}
