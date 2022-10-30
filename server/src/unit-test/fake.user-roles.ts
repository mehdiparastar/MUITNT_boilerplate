import { UserRoles } from '../enum/userRoles.enum';
import { Roles } from '../users/entities/roles.entity';

let roles: Roles[] = [
  {
    id: 1,
    [UserRoles.superUser]: true,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 2,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: true,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 3,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: true,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 4,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: true,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 5,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: true,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 6,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: true,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 7,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: true,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 8,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: true,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 9,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: true,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 10,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: true,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 11,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: true,
  } as Roles,
];

export { roles };