import { User as UserEntity } from '../users/entities/user.entity';
import { Request } from 'express';
import { Socket } from 'socket.io';

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
    JWT_ACCESS_SECRET?: string;
    JWT_REFRESH_SECRET?: string;
    OAUTH_GOOGLE_ID?: string;
    OAUTH_GOOGLE_SECRET?: string;
    OAUTH_GOOGLE_REDIRECT_URL?: string;
    CLIENT_PORT?: number;
    SERVER_PORT?: number;
    JWT_ACCESS_EXPIRATION_TIME?: string | number;
    JWT_REFRESH_EXPIRATION_TIME?: string | number;
  }

  interface IGoogleUser {
    provider: string;
    providerId: string;
    name: string;
    email: string;
    photo: string;
    accessToken?: string;
    refreshToken?: string;
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

  type AuthPayload = {
    user: UserEntity;
    roomsId: string[];
  };

  type SocketWithAuth = Socket & AuthPayload;
  type RequestWithAuth = Request & AuthPayload;
}

export {};
