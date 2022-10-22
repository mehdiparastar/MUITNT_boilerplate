import { IsBoolean } from 'class-validator';
import { UserRoles } from '../../../enum/userRoles.enum';

export class ApproveUserRolesDto {
  // @IsBoolean()
  // [UserRoles.superUser]?: boolean = false;

  @IsBoolean()
  [UserRoles.admin]?: boolean = false;

  @IsBoolean()
  [UserRoles.expert_l1]?: boolean = false;

  @IsBoolean()
  [UserRoles.expert_l2]?: boolean = false;

  @IsBoolean()
  [UserRoles.user_l1]?: boolean = false;

  @IsBoolean()
  [UserRoles.user_l2]?: boolean = true;
}
