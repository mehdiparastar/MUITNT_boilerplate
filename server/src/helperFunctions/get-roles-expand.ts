import { UserRoles } from '../enum/userRoles.enum';

const allRoles: string[] = Object.values(UserRoles);

const getFirst1Digit = (num: string) => num.slice(0, 1);
const getFirst3Digit = (num: string) => num.slice(0, 3);
const getLast1Digit = (num: string) => num.slice(3, 4);

const getRoles = (role: string) => {
  const thisRoleFirst1Digit = getFirst1Digit(role);
  const thisRoleFirst3Digit = getFirst3Digit(role);
  const thisRoleLast1Digit = getLast1Digit(role);

  const result = allRoles.filter((userRole) => {
    if (
      Number(getFirst1Digit(userRole)) > Number(thisRoleFirst1Digit) ||
      (Number(getFirst3Digit(userRole)) === Number(thisRoleFirst3Digit) &&
        Number(getLast1Digit(userRole)) > Number(thisRoleLast1Digit)) ||
      Number(userRole) === Number(role)
    ) {
      return true;
    }
    return false;
  });

  return result;
};

export const getRolesExpand = (currentRoles: string[]) => {
  const expand = currentRoles
    .map((role: string) => getRoles(role))
    .flat(Infinity)
    .filter((item) => item !== undefined) as string[];
  return expand.filter((n, i) => expand.indexOf(n) === i);
};
