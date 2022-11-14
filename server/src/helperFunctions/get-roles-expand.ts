import { UserRoles } from '../enum/userRoles.enum';

const userRolesPeriorities = {
  [UserRoles.superUser]: [
    UserRoles.superUser,
    UserRoles.admin,
    UserRoles.adminSection1,
    UserRoles.adminSection2,
    UserRoles.adminSection3,
    UserRoles.section1ExpertL1,
    UserRoles.section1ExpertL2,
    UserRoles.section2ExpertL1,
    UserRoles.section2ExpertL2,
    UserRoles.section3ExpertL1,
    UserRoles.section3ExpertL2,
  ],
  [UserRoles.admin]: [
    UserRoles.admin,
    UserRoles.adminSection1,
    UserRoles.adminSection2,
    UserRoles.adminSection3,
    UserRoles.section1ExpertL1,
    UserRoles.section1ExpertL2,
    UserRoles.section2ExpertL1,
    UserRoles.section2ExpertL2,
    UserRoles.section3ExpertL1,
    UserRoles.section3ExpertL2,
  ],
  [UserRoles.adminSection1]: [
    UserRoles.adminSection1,
    UserRoles.section1ExpertL1,
    UserRoles.section1ExpertL2,
  ],
  [UserRoles.adminSection2]: [
    UserRoles.adminSection2,
    UserRoles.section2ExpertL1,
    UserRoles.section2ExpertL2,
  ],
  [UserRoles.adminSection3]: [
    UserRoles.adminSection3,
    UserRoles.section3ExpertL1,
    UserRoles.section3ExpertL2,
  ],
  [UserRoles.section1ExpertL1]: [
    UserRoles.section1ExpertL1,
    UserRoles.section1ExpertL2,
  ],
  [UserRoles.section1ExpertL2]: [UserRoles.section1ExpertL2],
  [UserRoles.section2ExpertL1]: [
    UserRoles.section2ExpertL1,
    UserRoles.section2ExpertL2,
  ],
  [UserRoles.section2ExpertL2]: [UserRoles.section2ExpertL2],
  [UserRoles.section3ExpertL1]: [
    UserRoles.section3ExpertL1,
    UserRoles.section3ExpertL2,
  ],
  [UserRoles.section3ExpertL2]: [UserRoles.section3ExpertL2],
};

export const getRolesExpand = (currentRoles: string[]) => {
  const expand = currentRoles.map((role: string) => userRolesPeriorities[role]);
  return [
    ...new Set(expand.filter((item) => item !== undefined).flat(Infinity)),
  ];
};
