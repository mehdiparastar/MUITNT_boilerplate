import { User as UserEntity } from '../users/entities/user.entity';
import { UserRoles } from '../enum/userRoles.enum';

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
  }

  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

export {};
