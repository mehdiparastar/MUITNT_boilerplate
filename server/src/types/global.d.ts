import { User as UserEntity } from '../users/entities/user.entity';
import { Request } from 'express';
import { Socket } from 'socket.io';

declare global {
  interface IconfigService {
    COOKIE_KEY?: string;
    DB_NAME?: string;
    JWT_ACCESS_SECRET?: string;
    JWT_REFRESH_SECRET?: string;
    JWT_STREAM_SECRET?: string;
    OAUTH_GOOGLE_ID?: string;
    OAUTH_GOOGLE_SECRET?: string;
    OAUTH_GOOGLE_REDIRECT_URL?: string;
    RUNNING_MECHINE_URL?: string;
    CLIENT_PORT?: number;
    SERVER_PORT?: number;
    NMS_HTTP_PORT?: number;
    NMS_RTMP_PORT?: number;
    JWT_ACCESS_EXPIRATION_TIME?: string | number;
    JWT_REFRESH_EXPIRATION_TIME?: string | number;
    JWT_STREAM_EXPIRATION_TIME?: string | number;
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
    streamToken: string;
  }

  type AuthPayload = {
    user: UserEntity & { socketId?: string };
    roomsId: string[];
  };

  type SocketWithAuth = Socket & AuthPayload;
  type RequestWithAuth = Request & AuthPayload;

  interface NMSConfig {
    logType?: number;
    rtmp?: NMSRtmpConfig;
    http?: NMSHttpConfig;
    https?: NMSSslConfig;
    trans?: NMSTransConfig;
    relay?: NMSRelayConfig;
    fission?: NMSFissionConfig;
    auth?: NMSAuthConfig;
  }

  interface NMSRtmpConfig {
    port?: number;
    ssl?: NMSSslConfig;
    chunk_size?: number;
    gop_cache?: boolean;
    ping?: number;
    ping_timeout?: number;
  }

  interface NMSSslConfig {
    key: string;
    cert: string;
    port?: number;
  }

  interface NMSHttpConfig {
    mediaroot: string;
    port?: number;
    allow_origin?: string;
  }

  interface NMSAuthConfig {
    play?: boolean;
    publish?: boolean;
    secret?: string;
  }

  interface NMSTransConfig {
    ffmpeg: string;
    tasks: NMSTransTaskConfig[];
  }

  interface NMSRelayConfig {
    tasks: NMSRelayTaskConfig[];
    ffmpeg: string;
  }

  interface NMSFissionConfig {
    ffmpeg: string;
    tasks: NMSFissionTaskConfig[];
  }

  interface NMSTransTaskConfig {
    app: string;
    hls?: boolean;
    hlsFlags?: string;
    dash?: boolean;
    dashFlags?: string;
    vc?: string;
    vcParam?: string[];
    ac?: string;
    acParam?: string[];
    rtmp?: boolean;
    rtmpApp?: string;
    mp4?: boolean;
    mp4Flags?: string;
  }

  interface NMSRelayTaskConfig {
    app: string;
    name?: string;
    mode: string;
    edge: string;
    rtsp_transport?: string;
    appendName?: boolean;
  }

  interface NMSFissionTaskConfig {
    rule: string;
    model: NMSFissionTaskModel[];
  }

  interface NMSFissionTaskModel {
    ab: string;
    vb: string;
    vs: string;
    vf: string;
  }
}

export { };
