import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { reactionTypeEnum } from 'src/enum/reactionType.enum';
import { UserDto, UserIdDto } from 'src/users/dto/user/user.dto';

export class ReactionDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({ default: reactionTypeEnum.like, enum: reactionTypeEnum })
  type: reactionTypeEnum;

  @Expose()
  @ApiProperty()
  creator: UserIdDto
}

export class ReactionDto1 {
  allReactions: Partial<{ [key in reactionTypeEnum]: number }>;
  thisUserReaction: Partial<{ [key in reactionTypeEnum]: number }>;
}