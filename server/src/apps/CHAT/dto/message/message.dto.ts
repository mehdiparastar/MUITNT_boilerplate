import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { chatMessageStatus } from 'src/enum/chatMessageStatus.enum';
import { UserDto, UserCompressDto } from 'src/users/dto/user/user.dto';

export class MessageDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty({ enum: chatMessageStatus })
  status: chatMessageStatus;

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
  writer: UserDto;

  @Expose()
  @Type(() => UserCompressDto)
  @ApiProperty()
  status_delivered_users: UserCompressDto[];

  @Expose()
  @Type(() => UserCompressDto)
  @ApiProperty()
  status_seen_users: UserCompressDto[];

  @Expose()
  @ApiProperty()
  isSeen?: boolean

  @Expose()
  @ApiProperty()
  isDelivered?: boolean
}
