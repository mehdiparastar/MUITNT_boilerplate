import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { UserDto, UserCompressDto } from 'src/users/dto/user/user.dto';
import { RoomIntendedParticipantDto } from '../intendedParticipant/intended-participant.dto';
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
  @Type(() => RoomIntendedParticipantDto)
  @ApiProperty()
  intendedParticipants: RoomIntendedParticipantDto[];

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

export class RoomDtoWithMessages extends RoomDtoWithoutMessages {
  @Expose()
  @Type(() => MessageDto)
  @ApiProperty()
  messages: MessageDto[];
}
