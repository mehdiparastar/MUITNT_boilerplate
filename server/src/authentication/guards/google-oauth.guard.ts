import {
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super({
      // accessType: 'offline',
    });
  }

  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    // await super.logIn(request); to enabling session / we dont need it
    return activate;
  }  
}
