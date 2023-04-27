import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { UserDto } from 'src/users/dto/user/user.dto';
import { CrudReaction } from '../../entities/reaction.entity';
import { ReactionDto } from '../reaction/reaction.dto';

export class PostDto {
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
  @Type(() => ReactionDto)
  @ApiProperty()
  // @Transform(({ value }) => {
  //   return value?.reduce((p, c) => ({ ...p, [c.type]: (p[c.type] || 0) + 1 }), {}) || {}
  // })
  reactions: ReactionDto[];

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
  author: UserDto;
}
