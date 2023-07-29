import {
  forwardRef,
  Inject,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { VideoCallEvent } from 'src/enum/videoCallEvent.enum';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { getArrayOfObjectUniqulyByKey } from 'src/helperFunctions/get-array-of-object-unique-by-key';
import { VideoCallService } from './videoCall.service';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'videoCall',
})
export class VideoCallGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(VideoCallGateway.name);

  @WebSocketServer() io: Namespace;

  constructor(
    @Inject(forwardRef(() => VideoCallService))
    private readonly videoCallService: VideoCallService,
  ) {}

  getRoomsId(client: SocketWithAuth): string[] {
    const allRooms = [];
    client.rooms.forEach((roomId) => allRooms.push(roomId));
    return allRooms;
  }

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

    await client.join(client.roomsId);

    this.logger.debug(
      `userID: ${client.user.id} joined to ${client.roomsId.length} rooms.`,
    );
  }

  async handleDisconnect(client: SocketWithAuth) {
    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);
    this.io
      .to(client.roomsId)
      .emit(VideoCallEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers });

    console.log(`user with email of '${client.user.email}' disconnected.`);
  }

  async getUniqueOnlineUsers(client: SocketWithAuth) {
    const allRooms = client.roomsId;

    const uniqueOnlineUsers = (
      (await Promise.all(
        allRooms.map((roomId) => {
          return this.io.in(roomId).fetchSockets();
        }),
      )) as unknown as SocketWithAuth[][]
    ).reduce(
      (p, c: any[], i) => ({
        ...p,
        [allRooms[i]]: getArrayOfObjectUniqulyByKey(
          c.map((item) => item.user).filter((x) => x !== undefined),
          'id',
        ).map((usr) => ({ id: usr.id, email: usr.email, name: usr.name })),
      }),
      {},
    );

    return uniqueOnlineUsers;
  }



}
