import {
  forwardRef,
  Inject,
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { VideoCallEvent } from 'src/enum/videoCallEvent.enum';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { getArrayOfObjectUniqulyByKey } from 'src/helperFunctions/get-array-of-object-unique-by-key';
import { VideoCallService } from './videoCall.service';
import { AuthGatewayGuard } from './auth.gateway.guard';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'videoCall',
})
export class VideoCallGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(VideoCallGateway.name);

  @WebSocketServer() io: Namespace;

  constructor(
    @Inject(forwardRef(() => VideoCallService))
    private readonly videoCallService: VideoCallService,
  ) { }

  getRoomsId(client: SocketWithAuth): string[] {
    const allRooms = [];
    client.rooms.forEach((roomId) => allRooms.push(roomId));
    return allRooms.filter(item => item !== client.id);
  }

  async afterInit(io: Namespace) {
    this.logger.log(
      `**Websocket Gateway initialized with the name => ${io.name}.**`,
    );
  }

  async handleConnection(client: SocketWithAuth, ...args: any[]) {
    const sockets = this.io.sockets;
    this.logger.debug(
      `Socket connected with userID: ${client.user.id
      }, pollID: ${'client.pollID'}, and name: "${client.user.name}"`,
    );

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    // await client.join(client.roomsId);

    this.logger.debug(
      `userID: ${client.user.id} initialized.`,
    );
  }

  async handleDisconnect(client: SocketWithAuth) {
    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);
    this.io
      .to(client.roomsId)
      .emit(VideoCallEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers });

    console.log(uniqueOnlineUsers, `user with email of '${client.user.email}' disconnected.`);
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

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(VideoCallEvent.NewMember)
  async NewMemberEvent(
    @MessageBody() { roomId }: { roomId: string },
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    // console.log(roomId, client.user);
    // const thisRoom = await this.chatService.findRoomById(room.id);
    // const intendedParticipants = thisRoom.intendedParticipants.filter(
    //   (item) => item.status === chatIntendedParticipantStatus.requested,
    // );

    await client.join(roomId);
    if (!client.roomsId.includes(roomId)) {
      client.roomsId.push(roomId)
    }


    // console.log(this.getRoomsId(client))
    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);
    console.log(Math.random(), uniqueOnlineUsers)

    this.io.to(roomId).emit(VideoCallEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers })

    // this.io.emit(
    //   ChatEvent.NewRoomIntendedParticipantBroadcast,
    //   intendedParticipants,
    // );

    // this.io.emit(ChatEvent.NewRoomCreatedBroadcast, {
    //   newRoom: thisRoom,
    //   socketOwner: client.user,
    // });

    // const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);

    // this.io
    //   .to(client.roomsId)
    //   .emit(ChatEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers });
  }
}
