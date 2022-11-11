import { User as UserEntity } from '../users/entities/user.entity';
import { UserRoles } from '../enum/userRoles.enum';

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
    JWT_ACCESS_SECRET?: string;
    JWT_REFRESH_SECRET?: string;
    OAUTH_GOOGLE_ID?: string;
    OAUTH_GOOGLE_SECRET?: string;
    OAUTH_GOOGLE_REDIRECT_URL?: string;
  }

  namespace Express {
    interface Request {
      user?: Partial<UserEntity>;
    }
  }

  interface IJwtPayload {
    sub: number;
    email: string;
  }

  interface IJWTTokensPair {
    accessToken: string;
    refreshToken: string;
  }
}

export {};
