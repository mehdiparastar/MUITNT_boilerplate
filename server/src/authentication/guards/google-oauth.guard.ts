import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super({
      // accessType: 'offline',
    });
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const activate = (await super.canActivate(context)) as boolean;
    // await super.logIn(request); to enabling session / we dont need it
    return activate;
  }  
}
