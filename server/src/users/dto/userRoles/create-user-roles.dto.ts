import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { UserRoles } from '../../../enum/userRoles.enum';

export class CreateUserRolesDto {
  // @IsBoolean()
  // @ApiProperty({ default: false })
  // [UserRoles.superUser]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.admin]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.crudAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.crudAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.crudAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.crudAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.chatAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.chatAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.chatAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.chatAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.rtmpCallAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.rtmpCallAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.rtmpCallAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.rtmpCallAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.fileAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.fileAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.fileAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.fileAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.movieAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.movieAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.movieAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.movieAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.musicAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.musicAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.musicAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.musicAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppUserLL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.webrtcCallAppAdmin]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.webrtcCallAppUserHL]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.webrtcCallAppUserML]?: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.webrtcCallAppUserLL]?: boolean;
}
