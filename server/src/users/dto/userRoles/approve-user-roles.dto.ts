import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { UserRoles } from '../../../enum/userRoles.enum';

export class ApproveUserRolesDto {
  // @IsBoolean()
  // [UserRoles.superUser]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.admin]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.adminSection1]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.adminSection2]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.adminSection3]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.section1ExpertL1]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.section1ExpertL2]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.section2ExpertL1]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.section2ExpertL2]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: false })
  [UserRoles.section3ExpertL1]?: boolean = false;

  @IsBoolean()
  @ApiProperty({ default: true })
  [UserRoles.section3ExpertL2]?: boolean = true;
}
