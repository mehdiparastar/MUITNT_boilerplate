import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { Socket } from 'socket.io';
import { AuthService } from 'src/authentication/auth.service';
import { UsersService } from 'src/users/users.service';

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);
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

    const jwtService = this.app.get(JwtService)
    const usersService = this.app.get(UsersService)
    const server: Server = super.createIOServer(port, optionsWithCORS);

    server.of('chat').use(createTokenMiddleware(jwtService, usersService, this.logger));

    return server;
  }
}

const createTokenMiddleware =
  (jwtService: JwtService, usersService: UsersService, logger: Logger) =>
    async (socket: Socket, next) => {
      // for Postman testing support, fallback to token header
      const accessToken = socket.handshake.auth.accessToken || socket.handshake.headers['accessToken'];

      logger.debug(`Validating auth token before connection: ${accessToken}`);

      try {
        const payload = jwtService.verify(accessToken);
        const x = await usersService.findByEmail(payload.email)
        // socket.userID = payload.sub;
        // socket.pollID = payload.pollID;
        // socket.name = payload.name;
        next();
      } catch (ex) {
        next(new Error('FORBIDDEN'));
      }
    };
