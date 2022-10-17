// enum UserRoles {
//   superUser = 'superUser',
//   admin = 'admin',
//   expert_l1 = 'expert_l1',
//   expert_l2 = 'expert_l2',
//   user_l1 = 'user_l1',
//   user_l2 = 'user_l2',
// }

import { UserRoles } from '../enum/userRoles.enum';

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
  }

  type IuserRole =
    | UserRoles.superUser
    | UserRoles.admin
    | UserRoles.expert_l1
    | UserRoles.expert_l2
    | UserRoles.user_l1
    | UserRoles.user_l2;
}

export { IuserRole };
