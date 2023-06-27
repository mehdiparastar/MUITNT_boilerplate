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
  WebSocketServer
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { ChatEvent } from 'src/enum/chatEvent.enum';
import { chatIntendedParticipantStatus } from 'src/enum/chatIntendedParticipantStatus.enum';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { getArrayOfObjectUniqulyByKey } from 'src/helperFunctions/get-array-of-object-unique-by-key';
import { AuthGatewayGuard } from './auth.gateway.guard';
import { ChatService } from './chat.service';
import { ChatIntendedParticipants } from './entities/intendedParticipants.entity';
import { ChatMessage } from './entities/messages.entity';
import { ChatRoom } from './entities/room.entity';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Namespace;

  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
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
      .emit(ChatEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers });

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

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(ChatEvent.NewMember)
  async NewMemberEvent(@ConnectedSocket() client: SocketWithAuth) {
    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);
    this.io
      .to(client.roomsId)
      .emit(ChatEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers });

    const addDeliveryToMyAllMessages =
      await this.chatService.addDeliveredToMyAllMessages(client.user);
    if (addDeliveryToMyAllMessages.length > 0) {
      this.io.to(client.roomsId).emit(ChatEvent.MultipleDeliveringBroadCast, {
        messages: addDeliveryToMyAllMessages,
      });
    }
  }

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(ChatEvent.ChangeActiveRoom)
  async ChangeActiveRoomEvent(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() { currentActiveRoomId }: { currentActiveRoomId: number },
  ) {
    const addSeenToAllMessagesOfThisActiveRoom =
      await this.chatService.addSeenToThisRoomAllMessages(
        client.user,
        currentActiveRoomId,
      );

    if (addSeenToAllMessagesOfThisActiveRoom.length > 0) {
      this.io
        .to(currentActiveRoomId.toString())
        .emit(ChatEvent.MultipleSeenBroadCast, {
          messages: addSeenToAllMessagesOfThisActiveRoom,
          currentActiveRoomId,
        });
    }
  }

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(ChatEvent.NewMessage)
  async NewMessageEvent(
    @MessageBody() msg: ChatMessage,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);
    await this.chatService.addMessageDelivering(
      client.user,
      msg,
      uniqueOnlineUsers,
    );
    const message = await this.chatService.getMessage(client.user, msg.id);
    this.io
      .to(message.room.id.toString())
      .emit(ChatEvent.NewMessageBroadCast, message);
  }

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(ChatEvent.MessageSeen)
  async NewMessageSeenEvent(
    @MessageBody() { messageId, roomId }: { messageId: number; roomId: number },
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    const addSeen = await this.chatService.addMessageSeen(
      client.user,
      messageId,
      roomId,
    );
    if (addSeen) {
      const membersId = (await this.chatService.getRoomMembers(roomId))
        .map((item) => item.id)
        .sort();
      this.io.to(roomId.toString()).emit(ChatEvent.MessageSeenBroadCast, {
        seenMessageId: messageId,
        roomId,
        seenUser: {
          id: client.user.id,
          email: client.user.email,
          name: client.user.name,
        },
        membersId,
      });
    }
  }

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(ChatEvent.NewRoomCreated)
  async NewRoomCreatedEvent(
    @MessageBody() room: ChatRoom,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    const thisRoom = await this.chatService.findRoomById(room.id);
    const intendedParticipants = thisRoom.intendedParticipants.filter(
      (item) => item.status === chatIntendedParticipantStatus.requested,
    );

    client.roomsId.push(thisRoom.id.toString());
    await client.join(thisRoom.id.toString());

    this.io.emit(
      ChatEvent.NewRoomIntendedParticipantBroadcast,
      intendedParticipants,
    );

    this.io.emit(ChatEvent.NewRoomCreatedBroadcast, {
      newRoom: thisRoom,
      socketOwner: client.user,
    });

    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);

    this.io
      .to(client.roomsId)
      .emit(ChatEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers });
  }

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(ChatEvent.JoinRequestConfirmed)
  async JoinRequestConfirmationEvent(
    @MessageBody() chatIntendedParticipant: ChatIntendedParticipants,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    const thisIntendedParticipant =
      await this.chatService.findIntendedParticipantById(
        chatIntendedParticipant.id,
      );
    const thisRoom = thisIntendedParticipant.room;
    // const intendedParticipants = thisIntendedParticipant.room.intendedParticipants.filter(item => item.status === chatIntendedParticipantStatus.requested)

    if (!client.roomsId.includes(thisRoom.id.toString())) {
      client.roomsId.push(thisRoom.id.toString());
      await client.join(thisRoom.id.toString());
    }

    this.io.emit(ChatEvent.NewRoomCreatedBroadcast, {
      newRoom: thisRoom,
      socketOwner: client.user,
    });

    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);

    this.io
      .to(client.roomsId)
      .emit(ChatEvent.NewMemberBroadCast, { onlineUsers: uniqueOnlineUsers });

    this.io.emit(ChatEvent.ConfirmRequestBroadcast, thisIntendedParticipant);
  }

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(ChatEvent.JoinRequestRejected)
  async JoinRequestRejectionEvent(
    @MessageBody() chatIntendedParticipant: ChatIntendedParticipants,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    const thisIntendedParticipant =
      await this.chatService.findIntendedParticipantById(
        chatIntendedParticipant.id,
      );

    this.io.emit(ChatEvent.RejectRequestBroadcast, thisIntendedParticipant);
  }
}
