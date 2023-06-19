import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { TagDto } from 'src/tags/dto/tag.dto';
import { UserDto } from 'src/users/dto/user/user.dto';

export class MusicFileDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @Type(() => TagDto)
  @ApiProperty()
  tags: TagDto;

  @Expose()
  @ApiProperty()
  type: string;

  @Expose()
  @ApiProperty()
  fileHash: string;

  @Expose()
  @ApiProperty()
  size: number;

  @Expose()
  @ApiProperty()
  totalSegments: number;

  @Expose()
  @ApiProperty()
  uploadedComplete: boolean;

  @Expose()
  @ApiProperty()
  private: boolean;

  @Expose()
  @ApiProperty()
  hlsUrl: string;

  @Expose()
  @ApiProperty()
  streamable: boolean;

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
  owner: UserDto;
}
