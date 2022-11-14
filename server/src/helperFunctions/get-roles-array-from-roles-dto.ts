import { UserRolesDto } from '../users/dto/userRoles/user-roles.dto';

export const getRolesArray = (roles: Partial<UserRolesDto>) => {
  return Object.keys(roles).filter((role) => roles[role]);
};
