import {
  forwardRef,
  Inject,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { MoviesService } from './movies.service';
import { MovieEvent } from 'src/enum/movieEvent.enum';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'movie',
})
export class MovieGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(MovieGateway.name);

  @WebSocketServer() io: Namespace;

  constructor(
    @Inject(forwardRef(() => MoviesService))
    private readonly chatService: MoviesService,
  ) {}

  async afterInit(io: Namespace) {
    this.logger.log(
      `**Websocket Gateway initialized with the name => ${io.name}.**`,
    );
  }

  async handleConnection(client: SocketWithAuth, ...args: any[]) {
    const sockets = this.io.sockets;
    this.logger.debug(
      `Socket connected with userID: ${
        client.user.id
      }, pollID: ${'client.pollID'}, and name: "${client.user.name}"`,
    );

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    await client.join(client.user.email);

    this.logger.debug(
      `userID: ${client.user.id} joined to ${client.roomsId.length} rooms.`,
    );
  }

  async handleDisconnect(client: SocketWithAuth) {
    console.log(`user with email of '${client.user.email}' disconnected.`);
  }

  emitStreamablizationingProgress(
    room: string,
    fileName: string,
    progress: number,
  ) {
    this.io
      .to(room)
      .emit(MovieEvent.ConvertingProgress, { [fileName]: progress });
  }

  emitStreamablizationingComplete(fileId: number) {
    this.io.emit(MovieEvent.ConvertingComplete, { [fileId]: true });
  }
}
