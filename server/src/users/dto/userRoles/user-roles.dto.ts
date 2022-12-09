import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserRoles } from '../../../enum/userRoles.enum';

export class UserRolesDto {
  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.superUser]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.admin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.crudAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.crudAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.crudAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.crudAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.chatAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.chatAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.chatAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.chatAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.videoCallAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.videoCallAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.videoCallAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.videoCallAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.voiceCallAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.shareFileAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.shareFileAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.shareFileAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.shareFileAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.movieAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.movieAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.movieAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.movieAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.musicAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.musicAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.musicAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.musicAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.mapsAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.tradeBotAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.onlineShopAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.userManagementAppUserLL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppAdmin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppUserHL]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppUserML]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.bingoAppUserLL]?: boolean;
}
