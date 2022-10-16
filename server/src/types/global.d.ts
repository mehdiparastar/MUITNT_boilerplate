export enum userRoles {
  superUser = 'superUser',
  admin = 'admin',
  expert_l1 = 'expert_l1',
  expert_l2 = 'expert_l2',
  user_l1 = 'user_l1',
  user_l2 = 'user_l2',
}

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
  }

  type IuserRole =
    | userRoles.superUser
    | userRoles.admin
    | userRoles.expert_l1
    | userRoles.expert_l2
    | userRoles.user_l1
    | userRoles.user_l2;
}
