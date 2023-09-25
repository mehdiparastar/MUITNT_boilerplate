import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsUnauthorizedException } from 'src/exceptions/ws-exceptions';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGatewayGuard implements CanActivate {
  private readonly logger = new Logger(AuthGatewayGuard.name);
  constructor(
    private readonly jwtService: JwtService, // private readonly webrtcCallsService: WEBRTCCallService,
    protected configService: ConfigService<IconfigService>,

  ) { }
  async canActivate(context: any): Promise<boolean> {
    const socket: SocketWithAuth = context.switchToWs().getClient();

    if (!socket.user) {
      this.logger.error('Unknown Socket provided');

      throw new WsUnauthorizedException('Unknown Socket provided');
    }

    try {
      this.logger.debug(`\nValidating admin using token payload ${socket.user.email}\n`);
      const aT = context.getData().accessToken
      if (context.getPattern() === 'webrtc_signaling') {
        console.log('')
      }
      const verify = this.jwtService.verify(aT, { secret: this.configService.get<string>('JWT_ACCESS_SECRET') })
      if (verify) {
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
