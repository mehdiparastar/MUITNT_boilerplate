import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatEvent } from 'src/enum/chatEvent.enum';
import { WsUnauthorizedException } from 'src/exceptions/ws-exceptions';
import { ChatService } from './chat.service';

@Injectable()
export class AuthGatewayGuard implements CanActivate {
  private readonly logger = new Logger(AuthGatewayGuard.name);
  constructor(
    private readonly jwtService: JwtService,
  ) // private readonly chatsService: ChatService,
  {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // regular `Socket` from socket.io is probably sufficient
    const socket: SocketWithAuth = context.switchToWs().getClient();

    // for testing support, fallback to token header

    if (!socket.user) {
      this.logger.error('No authorization token provided');

      throw new WsUnauthorizedException('No token provided');
    }

    try {
      this.logger.debug(
        `Validating admin using token payload`,
        socket.user.email,
      );

      // if (sub !== poll.adminID) {
      //     throw new WsUnauthorizedException('Admin privileges required');
      // }

      return true;
    } catch (ex) {
      throw new WsUnauthorizedException(
        ex.message || 'Admin privileges required',
      );
    }
  }
}
