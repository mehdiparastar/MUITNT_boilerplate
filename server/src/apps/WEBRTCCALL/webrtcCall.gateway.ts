import {
  forwardRef,
  Inject,
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import * as path from 'path';
import { Namespace } from 'socket.io';
import { CallInfoState, WEBRTCCallEvent, WEBRTCSignaling } from 'src/enum/webrtcCallEvent.enum';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { getArrayOfObjectUniqulyByKey } from 'src/helperFunctions/get-array-of-object-unique-by-key';
import { AccessRoomAuthGatewayGuard } from './accessRoom.auth.gateway.guard';
import { AuthGatewayGuard } from './auth.gateway.guard';
import { WEBRTCCallService } from './webrtcCall.service';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'webrtcCall',
})
export class WEBRTCCallGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(WEBRTCCallGateway.name);
  private uploadPath: string;

  @WebSocketServer() io: Namespace;

  constructor(
    @Inject(forwardRef(() => WEBRTCCallService))
    private readonly webrtcCallService: WEBRTCCallService,
    protected configService: ConfigService<IconfigService>,
  ) {
    this.uploadPath = path.join(process.cwd(), '..', 'uploads', 'conference'); // Define your upload directory

  }

  getRoomsId(client: SocketWithAuth): string[] {
    const allRooms = [];
    client.rooms.forEach((roomId) => allRooms.push(roomId));
    return allRooms.filter(item => item !== client.id);
  }

  async afterInit(io: Namespace) {
    this.logger.log(`\n**Websocket Gateway initialized with the name => ${io.name}.**\n`);
  }

  async handleConnection(client: SocketWithAuth, ...args: any[]) {
    const sockets = this.io.sockets;

    this.logger.debug(`\nUser ID "${client.user.id}" (${client.id}) with name "${client.user.name}" connected.(WEBRTC Socket)\n`);
    this.logger.debug(`\nNumber of connected sockets: ${sockets.size}\n`);

  }

  async handleDisconnect(client: SocketWithAuth) {
    const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);

    this.io
      .to(client.roomsId)
      .emit(WEBRTCCallEvent.NewMemberBroadCast, {
        onlineUsers: uniqueOnlineUsers,
      });


    this.logger.debug(`\nuser with email '${client.user.email}' disconnected.\n`);

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

  async fetchAllSockets() {
    const allSockets = await this.io.fetchSockets() as unknown as SocketWithAuth[]
    return allSockets.filter(socket => socket.connected)
  }

  async fetchAllRoomSockets(roomLink: string) {
    const allSockets = await this.io.in(roomLink).fetchSockets() as unknown as SocketWithAuth[]
    return allSockets.filter(socket => socket.connected)
  }

  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(WEBRTCCallEvent.AcceptCall)
  async AcceptCall(
    @MessageBody() call: { roomLink: string, caller: { name: string, email: string, photo: string }, },
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    try {
      const { link } = await this.webrtcCallService.getMyConferenceLink(client.user)
      const room = await this.webrtcCallService.findRoomByLink(link)

      if (call.roomLink === link) {
        const allSockets = await this.io.fetchSockets() as unknown as SocketWithAuth[]
        const callerSocket = allSockets.find(socket => socket.user.email === call.caller.email)
        const lastValidCallInfo = await this.webrtcCallService.findLastValidCallInfoByEmailAndRoomLink(call.caller.email, call.roomLink)
        if (lastValidCallInfo) {
          await callerSocket.join(call.roomLink)
          if (!client.roomsId.includes(call.roomLink)) {
            client.roomsId.push(call.roomLink)
          }
          const roomCreatorSocketId = allSockets.find(socket => socket.user.id === room.creator.id).id
          const update = await this.webrtcCallService.updateCallInfo(lastValidCallInfo.id, { state: CallInfoState.Accepted })

          this.io.to(link).emit(WEBRTCCallEvent.JoinRequest, {
            joinRequest: {
              [update.id.toString()]: {
                roomLink: update.room.link,
                state: update.state,
                caller: {
                  email: update.creator.email,
                  name: update.creator.name,
                  photo: update.creator.photo
                },
                callee: {
                  email: room.creator.email,
                  name: room.creator.name,
                  photo: room.creator.photo
                }
              }
            }
          })

          this.io.to(callerSocket.id).emit(WEBRTCCallEvent.JoinRequest, {
            joinRequest: {
              [update.id.toString()]: {
                roomLink: update.room.link,
                state: update.state,
                caller: {
                  email: update.creator.email,
                  name: update.creator.name,
                  photo: update.creator.photo
                },
                callee: {
                  email: room.creator.email,
                  name: room.creator.name,
                  photo: room.creator.photo
                }
              }
            }
          })

          const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);
          this.io.to(call.roomLink).emit(WEBRTCCallEvent.NewMemberBroadCast, {
            onlineUsers: uniqueOnlineUsers,
          })
        }
      }
    }
    catch (ex) {
      console.log('\n\n\nnew mwmber\n\n\n', ex)
    }
  }


  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(WEBRTCCallEvent.NewMember)
  async NewMemberEvent(
    @MessageBody() { roomId }: { roomId: string },
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    try {
      const { link } = await this.webrtcCallService.getMyConferenceLink(client.user)
      if (roomId === link) {
        await client.join(roomId);
        if (!client.roomsId.includes(roomId)) {
          client.roomsId.push(roomId)
        }
        const uniqueOnlineUsers = await this.getUniqueOnlineUsers(client);
        this.io.to(roomId).emit(WEBRTCCallEvent.NewMemberBroadCast, {
          onlineUsers: uniqueOnlineUsers,
        })
      }
      else {
        const room = await this.webrtcCallService.findRoomByLink(roomId)
        const newCallInfo = await this.webrtcCallService.addNewCallInfo({
          room: room,
          creator: client.user,
          state: CallInfoState.Calling
        })

        const allSockets = await this.io.fetchSockets() as unknown as SocketWithAuth[]
        const roomCreatorSocketId = allSockets.find(socket => socket.user.id === room.creator.id).id
        const desireRoomSockets = await this.io.in(room.link).fetchSockets()
        const roomCreatorAvailable = desireRoomSockets.find(socket => socket.id === roomCreatorSocketId)

        this.io.to(client.id).emit(WEBRTCCallEvent.JoinRequest, {
          joinRequest: {
            [newCallInfo.id.toString()]: {
              roomLink: newCallInfo.room.link,
              state: newCallInfo.state,
              caller: {
                email: newCallInfo.creator.email,
                name: newCallInfo.creator.name,
                photo: newCallInfo.creator.photo
              },
              callee: {
                email: room.creator.email,
                name: room.creator.name,
                photo: room.creator.photo
              }
            }
          }
        })

        if (roomCreatorAvailable) {
          this.io.to(roomCreatorSocketId).emit(WEBRTCCallEvent.JoinRequest, {
            joinRequest: {
              [newCallInfo.id.toString()]: {
                roomLink: newCallInfo.room.link,
                state: newCallInfo.state,
                caller: {
                  email: newCallInfo.creator.email,
                  name: newCallInfo.creator.name,
                  photo: newCallInfo.creator.photo
                },
                callee: {
                  email: room.creator.email,
                  name: room.creator.name,
                  photo: room.creator.photo
                }
              }
            }
          })

          const timeout = setTimeout(async () => {
            try {
              // Your asynchronous task logic goes here            
              const find = await this.webrtcCallService.findCallInfoById(newCallInfo.id)

              console.log(
                'Custom async task executed.',
                find.state,
                Math.floor(((new Date()).getTime() - find.createdAt.getTime()) / 1000)
              );
              if (find.state === CallInfoState.Calling) {
                const update = await this.webrtcCallService.updateCallInfo(newCallInfo.id, { state: CallInfoState.Missed })

                this.io.to(roomCreatorSocketId).emit(WEBRTCCallEvent.JoinRequest, {
                  joinRequest: {
                    [update.id.toString()]: {
                      roomLink: update.room.link,
                      state: update.state,
                      caller: {
                        email: update.creator.email,
                        name: update.creator.name,
                        photo: update.creator.photo
                      },
                      callee: {
                        email: room.creator.email,
                        name: room.creator.name,
                        photo: room.creator.photo
                      }
                    }
                  }
                })

                this.io.to(client.id).emit(WEBRTCCallEvent.JoinRequest, {
                  joinRequest: {
                    [update.id.toString()]: {
                      roomLink: update.room.link,
                      state: update.state,
                      caller: {
                        email: update.creator.email,
                        name: update.creator.name,
                        photo: update.creator.photo
                      },
                      callee: {
                        email: room.creator.email,
                        name: room.creator.name,
                        photo: room.creator.photo
                      }
                    }
                  }
                })
              }
            } catch (error) {
              console.error('Error executing async task:', error);
            } finally {
              // Perform any cleanup or self-destruction logic here
              clearTimeout(timeout);
            }
          }, 60000); // 60 seconds in milliseconds
        }
        else {
          const update = await this.webrtcCallService.updateCallInfo(newCallInfo.id, { state: CallInfoState.UnAvailable })

          this.io.to(client.id).emit(WEBRTCCallEvent.JoinRequest, {
            joinRequest: {
              [update.id.toString()]: {
                roomLink: update.room.link,
                state: update.state,
                caller: {
                  email: update.creator.email,
                  name: update.creator.name,
                  photo: update.creator.photo
                },
                callee: {
                  email: room.creator.email,
                  name: room.creator.name,
                  photo: room.creator.photo
                }
              }
            }
          })

          const timeout = setTimeout(async () => {
            try {
              // Your asynchronous task logic goes here            
              const update = await this.webrtcCallService.updateCallInfo(newCallInfo.id, { state: CallInfoState.Missed })

              this.io.to(client.id).emit(WEBRTCCallEvent.JoinRequest, {
                joinRequest: {
                  [update.id.toString()]: {
                    roomLink: update.room.link,
                    state: update.state,
                    caller: {
                      email: update.creator.email,
                      name: update.creator.name,
                      photo: update.creator.photo
                    },
                    callee: {
                      email: room.creator.email,
                      name: room.creator.name,
                      photo: room.creator.photo
                    }
                  }
                }
              })
            } catch (error) {
              console.error('Error executing async task:', error);
            } finally {
              // Perform any cleanup or self-destruction logic here
              clearTimeout(timeout);
            }
          }, 10000); // 10 seconds in milliseconds

        }
      }
    }
    catch (ex) {
      console.log('\n\n\nnew mwmber\n\n\n', ex)
    }
  }


  @UseGuards(AuthGatewayGuard, AccessRoomAuthGatewayGuard)
  @SubscribeMessage(WEBRTCCallEvent.WEBRTCSignaling)
  async NewSignalingEvent(
    @MessageBody() { type, sdp, candidate, roomLink, callerEmail, accessToken }: { type: WEBRTCSignaling, sdp: RTCSessionDescriptionInit, candidate: RTCIceCandidate, roomLink: string, callerEmail: string, accessToken: string },
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    try {
      const thisRoomAllConnectedSockets = await this.fetchAllRoomSockets(roomLink)
      let calleeSocket: SocketWithAuth
      let callerSocket: SocketWithAuth

      switch (type) {
        case WEBRTCSignaling.Offer:
          calleeSocket = thisRoomAllConnectedSockets.find(socket => socket.user.id === client.user.id)
          callerSocket = thisRoomAllConnectedSockets.find(socket => socket.user.email === callerEmail)

          if (calleeSocket && callerSocket) {
            this.io.to(callerSocket.id).emit(WEBRTCCallEvent.WEBRTCSignaling, {
              type: WEBRTCSignaling.Offer,
              sdp: sdp,
              roomLink: roomLink,
            })
          }
          break

        case WEBRTCSignaling.Answer:
          callerSocket = thisRoomAllConnectedSockets.find(socket => socket.user.id === client.user.id)
          const calleeEmail = (await this.webrtcCallService.findRoomByLink(roomLink)).creator.email
          calleeSocket = thisRoomAllConnectedSockets.find(socket => socket.user.email === calleeEmail)
          console.warn('answer send to ', calleeSocket.user.email)
          if (calleeSocket && callerSocket) {
            this.io.to(calleeSocket.id).emit(WEBRTCCallEvent.WEBRTCSignaling, {
              type: WEBRTCSignaling.Answer,
              sdp: sdp,
              roomLink: roomLink,
            })
          }
          break

        case WEBRTCSignaling.IceCandidate:
          console.log('IceCandidate catched', client.user.email, candidate.usernameFragment)
          this.io.to(roomLink).emit(WEBRTCCallEvent.WEBRTCSignaling, {
            type: WEBRTCSignaling.IceCandidate,
            candidate: candidate,
            roomLink: roomLink,
            owner: { email: client.user.email, id: client.user.id }
          })
          break

        default:
          return

      }
    }
    catch (ex) {
      console.log('\n\n\nnew mwmber\n\n\n', ex)
    }
  }


  @UseGuards(AuthGatewayGuard)
  @SubscribeMessage(WEBRTCCallEvent.HangUp)
  async MemberHangUpEvent(
    @MessageBody() { roomId: roomLink }: { roomId: string },
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    try {
      await client.leave(roomLink);
      if (client.roomsId.includes(roomLink)) {
        client.roomsId = client.roomsId.filter(room => room !== roomLink)
      }
      const room = await this.webrtcCallService.findRoomByLink(roomLink)
      const allRoomSockets = await this.io.in(roomLink).fetchSockets() as unknown as SocketWithAuth[]
      const roomCreatorSocket = allRoomSockets.find(socket => socket.user.id === room.creator.id)

      const uniqueOnlineUsers = await this.getUniqueOnlineUsers(roomCreatorSocket);
      this.io
        .to(roomLink)
        .emit(WEBRTCCallEvent.NewMemberBroadCast, {
          onlineUsers: uniqueOnlineUsers,
        });
    }
    catch (ex) {
      console.log('\n\n\nnew mwmber\n\n\n', ex)
    }
  }
}
