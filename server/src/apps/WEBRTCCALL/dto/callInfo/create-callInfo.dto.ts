import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserDto } from 'src/users/dto/user/user.dto';
import { User } from 'src/users/entities/user.entity';
import { WEBRTCRoomDto } from '../room/room.dto';
import { CallInfoState } from 'src/enum/webrtcCallEvent.enum';

export class CreateCallInfoDto {
  @ApiProperty()
  room: WEBRTCRoomDto;

  @IsEnum(CallInfoState)
  @ApiProperty()
  state: CallInfoState;

  @ApiProperty()
  creator: UserDto;
}
