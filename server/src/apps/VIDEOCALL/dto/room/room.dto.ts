import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { UserCompressDto, UserDto } from 'src/users/dto/user/user.dto';

export class RoomDtoWithoutMessages {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  link: string;

  @Expose()
  @ApiProperty()
  @IsDate()
  createdAt?: Date;

  @Expose()
  @ApiProperty()
  @IsDate()
  updatedAt?: Date;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty()
  creator: UserDto;

  @Expose()
  @ApiProperty()
  onlineUsersCount?: number;

  @Expose()
  @ApiProperty()
  onlineUsers?: UserCompressDto[];
}

export class MyConferenceLinkDto {
  @Expose()
  @ApiProperty()
  link: string;
}
