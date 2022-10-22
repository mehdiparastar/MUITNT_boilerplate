import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { UserRoles } from '../../../enum/userRoles.enum';

export class CreateUserRolesDto {
  // @IsBoolean()
  // [UserRoles.superUser]?: boolean;
  
  @IsBoolean()
  [UserRoles.admin]?: boolean;

  @IsBoolean()
  [UserRoles.expert_l1]?: boolean;

  @IsBoolean()
  [UserRoles.expert_l2]?: boolean;

  @IsBoolean()
  [UserRoles.user_l1]?: boolean;

  @IsBoolean()
  [UserRoles.user_l2]?: boolean;
}
