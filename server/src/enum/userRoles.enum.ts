export enum UserRoles {
  superUser = 'superUser',
  admin = 'admin',

  adminSection1 = 'adminSection1',
  adminSection2 = 'adminSection2',
  adminSection3 = 'adminSection3',

  section1ExpertL1 = 'section1ExpertL1',
  section1ExpertL2 = 'section1ExpertL2',

  section2ExpertL1 = 'section2ExpertL1',
  section2ExpertL2 = 'section2ExpertL2',

  section3ExpertL1 = 'section3ExpertL1',
  section3ExpertL2 = 'section3ExpertL2',
}

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
