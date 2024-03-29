import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './apps/CHAT/chat.service';
import { MoviesService } from './apps/Movie/movies.service';
import { MusicsService } from './apps/Music/musics.service';
import { RTMPCallService } from './apps/RTMPCALL/rtmpCall.service';
import { WEBRTCCallService } from './apps/WEBRTCCALL/webrtcCall.service';

export class ApplicationSocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(ApplicationSocketIOAdapter.name);
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService<IconfigService>,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const clientPort = this.configService.get<number>('CLIENT_PORT');

    // cors: {origin: '*'}
    const cors = {
      origin: [
        `http://localhost:${clientPort}`,
        new RegExp(
          `/^http:\/\/192\.168\.(\d)\.([1-9]|[1-9]\d):${clientPort}$/`,
        ),
      ],
    };

    this.logger.log('Configuring SocketIO server with custom CORS options', {
      cors,
    });

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors,
    };

    const jwtService = this.app.get(JwtService);
    const usersService = this.app.get(UsersService);
    const chatService = this.app.get(ChatService);
    const rtmpCallService = this.app.get(RTMPCallService);
    const movieService = this.app.get(MoviesService);
    const webrtcCallService = this.app.get(WEBRTCCallService);
    const musicService = this.app.get(MusicsService);

    const server: Server = super.createIOServer(port, optionsWithCORS);

    const initWEBRTCCallSocketServer = server
      .of('webrtcCall')
      .use(
        createWEBRTCCallTokenMiddleware(
          jwtService,
          usersService,
          webrtcCallService,
          this.logger,
        ),
      );

    const initRTMPCallSocketServer = server
      .of('rtmpCall')
      .use(
        createRTMPCallTokenMiddleware(
          jwtService,
          usersService,
          rtmpCallService,
          this.logger,
        ),
      );

    const initChatSocketServer = server
      .of('chat')
      .use(
        createChatTokenMiddleware(
          jwtService,
          usersService,
          chatService,
          this.logger,
        ),
      );

    const initMovieSocketServer = server
      .of('movie')
      .use(
        createMovieTokenMiddleware(
          jwtService,
          usersService,
          movieService,
          this.logger,
        ),
      );

    const initMusicSocketServer = server
      .of('music')
      .use(
        createMusicTokenMiddleware(
          jwtService,
          usersService,
          musicService,
          this.logger,
        ),
      );

    return server;
  }
}

const createWEBRTCCallTokenMiddleware =
  (
    jwtService: JwtService,
    usersService: UsersService,
    webrtcCallService: WEBRTCCallService,
    logger: Logger,
  ) =>
    async (socket: SocketWithAuth, next) => {
      // for Postman testing support, fallback to token header
      const accessToken = (socket.handshake.auth.accessToken || socket.handshake.query.accessToken) as string;
      try {
        const payload = jwtService.verify(accessToken);
        const [user] = await usersService.findByEmail(payload.email);

        logger.debug(`\nValidating auth token before connection:  ${user.email}\n`);

        socket.user = { ...user, socketId: socket.id };
        socket.roomsId = [];

        next();
      } catch (ex) {
        console.log(ex)
        next(ex);
        // next(new Error('FORBIDDEN'));
      }
    };

const createRTMPCallTokenMiddleware =
  (
    jwtService: JwtService,
    usersService: UsersService,
    rtmpCallService: RTMPCallService,
    logger: Logger,
  ) =>
    async (socket: SocketWithAuth, next) => {
      // for Postman testing support, fallback to token header
      const accessToken = (socket.handshake.auth.accessToken || socket.handshake.query.accessToken) as string;
      try {
        const payload = jwtService.verify(accessToken);
        const [user] = await usersService.findByEmail(payload.email);

        // const allMyRooms = await rtmpCallService.findMyAllRooms(user);

        // const roomsId = allMyRooms.map((room) => room.id.toString());

        logger.debug(`Validating auth token before connection: ${user.email}`);

        socket.user = user;
        socket.roomsId = [];

        next();
      } catch (ex) {
        console.log(ex)
        next(ex);
        // next(new Error('FORBIDDEN'));
      }
    };

const createChatTokenMiddleware =
  (
    jwtService: JwtService,
    usersService: UsersService,
    chatService: ChatService,
    logger: Logger,
  ) =>
    async (socket: SocketWithAuth, next) => {
      // for Postman testing support, fallback to token header
      const accessToken = socket.handshake.query.accessToken as string;
      console.log(accessToken);
      try {
        const payload = jwtService.verify(accessToken);
        const [user] = await usersService.findByEmail(payload.email);

        const allMyRooms = await chatService.findMyAllRooms(user);

        const roomsId = allMyRooms.map((room) => room.id.toString());

        logger.debug(`Validating auth token before connection: ${user.email}`);

        socket.user = user;
        socket.roomsId = roomsId;

        next();
      } catch (ex) {
        next(ex);
        // next(new Error('FORBIDDEN'));
      }
    };

const createMovieTokenMiddleware =
  (
    jwtService: JwtService,
    usersService: UsersService,
    movieService: MoviesService,
    logger: Logger,
  ) =>
    async (socket: SocketWithAuth, next) => {
      // for Postman testing support, fallback to token header
      const accessToken = socket.handshake.query.accessToken as string;

      try {
        const payload = jwtService.verify(accessToken);
        const [user] = await usersService.findByEmail(payload.email);

        logger.debug(`Validating auth token before connection: ${user.email}`);

        socket.user = user;
        socket.roomsId = [user.email];

        next();
      } catch (ex) {
        next(ex);
        // next(new Error('FORBIDDEN'));
      }
    };

const createMusicTokenMiddleware =
  (
    jwtService: JwtService,
    usersService: UsersService,
    musicService: MusicsService,
    logger: Logger,
  ) =>
    async (socket: SocketWithAuth, next) => {
      // for Postman testing support, fallback to token header
      const accessToken = socket.handshake.query.accessToken as string;

      try {
        const payload = jwtService.verify(accessToken);
        const [user] = await usersService.findByEmail(payload.email);

        logger.debug(`Validating auth token before connection: ${user.email}`);

        socket.user = user;
        socket.roomsId = [user.email];

        next();
      } catch (ex) {
        next(ex);
        // next(new Error('FORBIDDEN'));
      }
    };
