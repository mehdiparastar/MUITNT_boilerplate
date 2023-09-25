import {
  CanActivate,
  Inject,
  Injectable,
  Logger,
  forwardRef
} from '@nestjs/common';
import { WsUnauthorizedException } from 'src/exceptions/ws-exceptions';
import { WEBRTCCallGateway } from './webrtcCall.gateway';

@Injectable()
export class AccessRoomAuthGatewayGuard implements CanActivate {
  private readonly logger = new Logger(AccessRoomAuthGatewayGuard.name);
  constructor(
    @Inject(forwardRef(() => WEBRTCCallGateway))
    private readonly webrtcCallGateway: WEBRTCCallGateway,
  ) { }
  async canActivate(context: any): Promise<boolean> {
    const socket: SocketWithAuth = context.switchToWs().getClient();

    if (!socket.user) {
      this.logger.error('Unknown Socket provided');

      throw new WsUnauthorizedException('Unknown Socket provided');
    }

    try {
      const roomLink = context.getData().roomLink
      const callerEmail = context.getData().callerEmail

      const allSockets = await this.webrtcCallGateway.fetchAllRoomSockets(roomLink)
      const clientSocket = allSockets.find(socket => socket.user.id === socket.user.id)

      this.logger.debug(`\nassesing of access authrorizing to room ${roomLink} of ${socket.user.email}\n`);

      if (clientSocket) {
        return true
      }

      throw new WsUnauthorizedException('Unauthorized Request');

    } catch (ex) {
      throw new WsUnauthorizedException(
        ex.message || 'Unauthorized Request',
      );
    }
  }
}
