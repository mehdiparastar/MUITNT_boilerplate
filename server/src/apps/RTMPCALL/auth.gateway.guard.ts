import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsUnauthorizedException } from 'src/exceptions/ws-exceptions';

@Injectable()
export class AuthGatewayGuard implements CanActivate {
  private readonly logger = new Logger(AuthGatewayGuard.name);
  constructor(
    private readonly jwtService: JwtService, // private readonly rtmpCallsService: RTMPCallService,
  ) {}
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
