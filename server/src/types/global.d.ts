import { User } from '../users/entities/user.entity';
import { UserRoles } from '../enum/userRoles.enum';

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
  }

namespace Express{
  interface Request{
    currentUser?:User
  }
}


}

export {};
