import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { reactionTypeEnum } from 'src/enum/reactionType.enum';

export class CreateReactionDto {
  @IsString()
  @ApiProperty({ default: reactionTypeEnum.like, enum: reactionTypeEnum })
  type: reactionTypeEnum;
}
