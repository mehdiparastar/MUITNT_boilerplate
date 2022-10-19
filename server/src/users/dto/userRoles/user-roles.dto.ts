import { Expose } from 'class-transformer';
import { UserRoles } from '../../../enum/userRoles.enum';

export class UserRolesDto {
  @Expose()
  [UserRoles.superUser]?: boolean;

  @Expose()
  [UserRoles.admin]?: boolean;

  @Expose()
  [UserRoles.expert_l1]?: boolean;

  @Expose()
  [UserRoles.expert_l2]?: boolean;

  @Expose()
  [UserRoles.user_l1]?: boolean;

  @Expose()
  [UserRoles.user_l2]?: boolean;
}
