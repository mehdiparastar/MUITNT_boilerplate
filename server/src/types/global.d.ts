import { User as UserEntity } from '../users/entities/user.entity';
import { UserRoles } from '../enum/userRoles.enum';

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
    JWT_SECRET?: string;
  }

  namespace Express {
    interface Request {
      currentUser?: UserEntity;
      user?: Partial<UserEntity>;
    }
  }
}

export {};
