import { Expose } from 'class-transformer';
import { UserRoles } from '../../../enum/userRoles.enum';

export class UserRolesDto {
  @Expose()
  [UserRoles.superUser]?: boolean;

  @Expose()
  [UserRoles.admin]?: boolean;

  @Expose()
  [UserRoles.adminSection1]?: boolean;

  @Expose()
  [UserRoles.adminSection2]?: boolean;

  @Expose()
  [UserRoles.adminSection3]?: boolean;

  @Expose()
  [UserRoles.section1ExpertL1]?: boolean;

  @Expose()
  [UserRoles.section1ExpertL2]?: boolean;
  @Expose()
  [UserRoles.section2ExpertL1]?: boolean;

  @Expose()
  [UserRoles.section2ExpertL2]?: boolean;

  @Expose()
  [UserRoles.section3ExpertL1]?: boolean;
  
  @Expose()
  [UserRoles.section3ExpertL2]?: boolean;
}
