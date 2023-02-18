import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { UserDto, UserIdDto } from 'src/users/dto/user/user.dto';
import { MessageDto } from '../message/message.dto';

export class RoomDtoWithoutMessages {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  caption: string;

  @Expose()
  @ApiProperty()
  photo: string;

  @Expose()
  @Type(() => UserIdDto)
  @ApiProperty()
  participants: UserIdDto[];

  @Expose()
  @Type(() => UserIdDto)
  @ApiProperty()
  admins: UserIdDto[];

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
}

export class RoomDtoWithMessages extends RoomDtoWithoutMessages {
  @Expose()
  @Type(() => MessageDto)
  @ApiProperty()
  messages: MessageDto[];
}
