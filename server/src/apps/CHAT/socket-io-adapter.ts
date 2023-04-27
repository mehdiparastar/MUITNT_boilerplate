import {
  BadRequestException,
  INestApplicationContext,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsException } from '@nestjs/websockets';
import { Server, ServerOptions } from 'socket.io';
import { Socket } from 'socket.io';
import { AuthService } from 'src/authentication/auth.service';
import { ChatEvent } from 'src/enum/chatEvent.enum';
import { WsBadRequestException } from 'src/exceptions/ws-exceptions';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './chat.service';

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

    const jwtService = this.app.get(JwtService);
    const usersService = this.app.get(UsersService);
    const chatService = this.app.get(ChatService);

    const server: Server = super.createIOServer(port, optionsWithCORS);

    const init = server
      .of('chat')
      .use(
        createTokenMiddleware(
          jwtService,
          usersService,
          chatService,
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
    chatService: ChatService,
    logger: Logger,
  ) =>
  async (socket: SocketWithAuth, next) => {
    // for Postman testing support, fallback to token header
    const accessToken = socket.handshake.query.accessToken as string;

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
