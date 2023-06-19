import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { MusicsService } from './musics.service';

export class MusicSocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(MusicSocketIOAdapter.name);
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
        new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
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
    const musicService = this.app.get(MusicsService);

    const server: Server = super.createIOServer(port, optionsWithCORS);

    const init = server
      .of('music')
      .use(
        createTokenMiddleware(
          jwtService,
          usersService,
          musicService,
          this.logger,
        ),
      );

    return server;
  }
}

const createTokenMiddleware =
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
