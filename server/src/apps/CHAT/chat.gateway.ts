import { Logger, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Request } from "express";
import { from, map, Observable } from "rxjs";
import { Namespace } from 'socket.io'
import { AuthService } from "src/authentication/auth.service";
import { AccessTokenStrategy } from "src/authentication/strategies/accessToken.strategy";
import { ChatEvent } from "src/enum/chatEvent.enum";
import { ChatService } from "./chat.service";

@UsePipes(new ValidationPipe())
// @UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
    namespace: 'chat'
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatGateway.name);
    constructor(
        private readonly chatService: ChatService,
        private xxx: AccessTokenStrategy
    ) { }

    @WebSocketServer() io: Namespace

    afterInit(io: Namespace): void {
        this.logger.log(`**Websocket Gateway initialized with the name => ${io.name}.**`);
    }

    async handleConnection(client: any, ...args: any[]) {
        const sockets = this.io.sockets;
        this.logger.debug(
            `Socket connected with userID: ${client.userID}, pollID: ${client.pollID}, and name: "${client.name}"`,
        );


        this.logger.log(`WS Client with id: ${client.id} connected!`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);

        const roomName = client.pollID;
        await client.join(roomName);

        const connectedClients = this.io.adapter.rooms?.get(roomName)?.size ?? 0;

        this.logger.debug(
            `userID: ${client.userID} joined room with name: ${roomName}`,
        );
        this.logger.debug(
            `Total clients connected to room '${roomName}': ${connectedClients}`,
        );

        // const updatedPoll = await this.chatService.addParticipant({
        //     pollID: client.pollID,
        //     userID: client.userID,
        //     name: client.name,
        // });

        // this.io.to(roomName).emit('poll_updated', updatedPoll);
    }

    handleDisconnect(client: any) {
        console.log('client')
    }

    @SubscribeMessage(ChatEvent.ReceiveMessage)
    onEvent(@MessageBody() data: unknown) {
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