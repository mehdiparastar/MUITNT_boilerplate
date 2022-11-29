import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request, Response } from 'express';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super({
      // accessType: 'offline',
      // approvalPrompt: 'auto',
      prompt: 'select_account',
      display: 'popup',
    });
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const response = context.switchToHttp().getResponse() as Response;
    
    console.log(request.headers)
    response.setHeader('X-Frame-Options', 'SAMEORIGIN');
    const activate = (await super.canActivate(context)) as boolean;
    // await super.logIn(request); to enabling session / we dont need it
    return activate;
  }
}
