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
import { ChildProcess, spawn } from 'child_process';
import * as path from 'path';
import { Namespace } from 'socket.io';
import { VideoCallEvent } from 'src/enum/videoCallEvent.enum';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { getArrayOfObjectUniqulyByKey } from 'src/helperFunctions/get-array-of-object-unique-by-key';
import { AuthGatewayGuard } from './auth.gateway.guard';
import { VideoCallService } from './videoCall.service';
// import ffmpeg from 'fluent-ffmpeg'
const ffmpeg = require('fluent-ffmpeg')

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'videoCall',
})
export class VideoCallGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(VideoCallGateway.name);
  private uploadPath: string;
  private ffmpegProcess: { [roomId: string]: { [clientId: string]: ChildProcess } }

  @WebSocketServer() io: Namespace;

  constructor(
    @Inject(forwardRef(() => VideoCallService))
    private readonly videoCallService: VideoCallService,
  ) {
    this.uploadPath = path.join(process.cwd(), '..', 'uploads', 'conference'); // Define your upload directory
    // Spawn ffmpeg process to send video stream to RTMP server
    this.ffmpegProcess = {}
  }

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

    console.log(`user with email of '${client.user.email}' disconnected.`);
    console.log(client.roomsId)

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
    try {
      await client.join(roomId);
      if (!client.roomsId.includes(roomId)) {
        client.roomsId.push(roomId)
      }


      // console.log(this.getRoomsId(client))
      const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);

      // console.log(this.ffmpegProcess[roomId][`client-${client.user.id}`].stdin.closed)
      if (!this.ffmpegProcess[roomId])
        this.ffmpegProcess[roomId] = {}
      if (this.ffmpegProcess[roomId][`client-${client.user.id}`])
        this.ffmpegProcess[roomId][`client-${client.user.id}`] = null

      this.ffmpegProcess[roomId][`client-${client.user.id}`] =
        spawn('ffmpeg', [
          '-i', '-',                            // Input from stdin
          '-c:v', 'libx264',                    // Video codec
          '-preset', 'ultrafast',               // Encoding speed preset
          '-tune', 'zerolatency',               // Tune for low-latency
          '-f', 'flv',                          // Output format
          `rtmp://192.168.1.6:1955/live/${roomId}-client-${client.user.id}` // RTMP server URL and stream key
        ]);

      // Handle FFmpeg process events
      this.ffmpegProcess[roomId][`client-${client.user.id}`].stdout.on('data', data => {
        console.log(`${roomId}-${client.user.id}: FFmpeg stdout: ${data}`);
      });

      this.ffmpegProcess[roomId][`client-${client.user.id}`].stderr.on('data', data => {
        console.error(`${roomId}-${client.user.id}: FFmpeg stderr: ${data}`);
      });

      this.ffmpegProcess[roomId][`client-${client.user.id}`].on('close', code => {
        console.log(`${roomId}-${client.user.id}: FFmpeg process exited with code ${code}`);
      });

      // Close the FFmpeg process on server shutdown
      process.on('exit', () => {
        this.ffmpegProcess[roomId][`client-${client.user.id}`].stdin.end();
      });

      this.io.to(roomId).emit(VideoCallEvent.NewMemberBroadCast, {
        onlineUsers: uniqueOnlineUsers,
        rtmpLinks: { [roomId]: Object.keys(this.ffmpegProcess[roomId]).map(item => `${roomId}-${item}`) }
      })
    }
    catch (ex) {
      console.log('\n\n\nnew mwmber\n\n\n', ex)
    }
  }


  // @UseGuards(AuthGatewayGuard)
  @SubscribeMessage('clientcamera')
  async ClientCameraChunksEvent(
    @MessageBody() msg: { chunk: any, roomId: string },
    @ConnectedSocket() client: SocketWithAuth,
  ) {

    // ffmpeg -re -i mehdi2.webm -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://192.168.1.6:1955/live/stream3

    // fs.appendFileSync(path.join(this.uploadPath, 'mehdi.webm'), chunk)
    // console.log(msg.roomId)
    // console.log(client.user.name)
    try {
      this.ffmpegProcess[msg.roomId][`client-${client.user.id}`].stdin.write(msg.chunk);
    }
    catch (ex) {
      console.log(ex)
    }



  }
}
