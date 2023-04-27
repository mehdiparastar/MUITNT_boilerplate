import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { chatIntendedParticipantStatus } from 'src/enum/chatIntendedParticipantStatus.enum';
import { UserDto, UserIdDto } from 'src/users/dto/user/user.dto';
import { RoomDtoWithoutMessages } from '../room/room.dto';

export class RoomIntendedParticipantDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({ enum: chatIntendedParticipantStatus })
  status: chatIntendedParticipantStatus;

  @Expose()
  @ApiProperty()
  isAdmin: boolean;

  @Expose()
  @Type(() => UserIdDto)
  @ApiProperty()
  participant: UserIdDto;

  @Expose()
  @Type(() => RoomDtoWithoutMessages)
  @ApiProperty()
  room: RoomDtoWithoutMessages;

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
