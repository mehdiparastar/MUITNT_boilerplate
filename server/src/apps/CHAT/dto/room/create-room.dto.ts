import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { UserDto } from 'src/users/dto/user/user.dto';
import { User } from 'src/users/entities/user.entity';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  title: string;

  @ApiProperty()
  @IsString()
  caption: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  photo?: string;

  @ApiProperty()
  @IsArray()
  intendedParticipants: UserDto[]
}
