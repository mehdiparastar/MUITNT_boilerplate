import { IsBoolean } from 'class-validator';
import { UserRoles } from '../../../enum/userRoles.enum';

export class ApproveUserRolesDto {
  // @IsBoolean()
  // [UserRoles.superUser]?: boolean = false;

  @IsBoolean()
  [UserRoles.admin]?: boolean = false;

  @IsBoolean()
  [UserRoles.adminSection1]?: boolean = false;

  @IsBoolean()
  [UserRoles.adminSection2]?: boolean = false;

  @IsBoolean()
  [UserRoles.adminSection3]?: boolean = false;

  @IsBoolean()
  [UserRoles.section1ExpertL1]?: boolean = false;

  @IsBoolean()
  [UserRoles.section1ExpertL2]?: boolean = false;

  @IsBoolean()
  [UserRoles.section2ExpertL1]?: boolean = false;

  @IsBoolean()
  [UserRoles.section2ExpertL2]?: boolean = false;

  @IsBoolean()
  [UserRoles.section3ExpertL1]?: boolean = false;

  @IsBoolean()
  [UserRoles.section3ExpertL2]?: boolean = true;
}