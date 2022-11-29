import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateLocalUserDto {
  @IsEmail()
  @ApiProperty({ default: 'test@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ default: 'test' })
  password: string;
}