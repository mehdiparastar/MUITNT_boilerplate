import { forwardRef, Inject, Logger, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Request } from "express";
import { from, map, Observable } from "rxjs";
import { Namespace, Socket } from 'socket.io'
import { AuthService } from "src/authentication/auth.service";
import { AccessTokenStrategy } from "src/authentication/strategies/accessToken.strategy";
import { ChatEvent } from "src/enum/chatEvent.enum";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { UserDto } from "src/users/dto/user/user.dto";
import { User } from "src/users/entities/user.entity";
import { getRepository } from "typeorm";
import { ChatService } from "./chat.service";

@UsePipes(new ValidationPipe())
// @UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
    namespace: 'chat'
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatGateway.name);

    @WebSocketServer() io: Namespace

    constructor(
        @Inject(forwardRef(() => ChatService))
        private readonly chatService: ChatService,
    ) { }

    async afterInit(io: Namespace) {
        this.logger.log(`**Websocket Gateway initialized with the name => ${io.name}.**`);
    }

    async handleConnection(client: Socket & { user: User }, ...args: any[]) {
        const sockets = this.io.sockets;
        this.logger.debug(
            `Socket connected with userID: ${client.user.id}, pollID: ${'client.pollID'}, and name: "${client.user.name}"`,
        );


        this.logger.log(`WS Client with id: ${client.id} connected!`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);

        const allMyRooms = await this.chatService.findMyAllRooms(client.user)

        const roomName = client.user.id.toString();
        const roomsId = allMyRooms.map(room => room.id.toString())

        await client.join(roomsId);

        const connectedClients = this.io.adapter.rooms?.get(roomName)?.size ?? 0;

        this.logger.debug(
            `userID: ${client.user.id} joined to ${allMyRooms.length} rooms.`,
        );

        this.io.to(roomsId).emit(
            'rooms_updated',
            allMyRooms
                .map(
                    room => {
                        return (
                            {
                                ...room,
                                onlineUsers:
                                    room.onlineUsers.map(usr => usr.id).includes(client.user.id) ?
                                        room.onlineUsers :
                                        [...room.onlineUsers, client.user],
                                onlineUsersCount: (
                                    room.onlineUsers.map(usr => usr.id).includes(client.user.id) ?
                                        room.onlineUsers :
                                        [...room.onlineUsers, client.user]
                                ).length
                                // this.io.adapter.rooms?.get(room.id.toString())?.size ?? 0
                            }
                        )
                    })
        )
        // this.io.to(roomName).emit('poll_updated', updatedPoll);
    }

    handleDisconnect(client: any) {
        console.log('client disconnect')
    }

    @SubscribeMessage(ChatEvent.DeliverMessage)
    @Serialize(UserDto)
    async onEvent(
        @MessageBody() data: unknown,
        @ConnectedSocket() client: Socket & { user: User },
    ) {
        const event = 'events'
        const response = [1, 2, 3]
        this.io.emit(ChatEvent.SendMessage, {
            msg: 'New Message',
            content: from(response).pipe(
                map(data => ({ event, data }))
            )
        })
        this.io.emit(ChatEvent.ReceiveMessage, {
            msg: 'New Message',
            content: from(response).pipe(
                map(data => ({ event, data }))
            )
        })
    }
}