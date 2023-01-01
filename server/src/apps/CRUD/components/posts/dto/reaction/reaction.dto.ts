import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { reactionTypeEnum } from 'src/enum/reactionType.enum';
import { UserDto } from 'src/users/dto/user/user.dto';

export class ReactionDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({ default: reactionTypeEnum.like, enum: reactionTypeEnum })
  type: reactionTypeEnum;
}
