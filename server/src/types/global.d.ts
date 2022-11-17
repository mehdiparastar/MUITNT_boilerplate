import { User as UserEntity } from '../users/entities/user.entity';

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

  interface IGoogleUser {
    provider: string;
    providerId: string;
    name: string;
    email: string;
    photo: string;
    accessToken: string;
    refreshToken: string;
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
