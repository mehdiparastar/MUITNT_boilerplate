import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { User } from '../../users/entities/user.entity';

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
    // await super.logIn(request);
    return activate;
  }  

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
	
}
