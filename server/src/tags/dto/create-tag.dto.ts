import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { appNameEnum } from 'src/enum/appName.enum';

export class CreateTagDto {
  @IsString()
  @ApiProperty()
  @MaxLength(14)
  tag: string;

  @IsString()
  @ApiProperty()
  appName: appNameEnum;
}
