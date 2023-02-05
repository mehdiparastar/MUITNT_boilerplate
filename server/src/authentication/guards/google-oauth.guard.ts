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
      // response_type: "code",
      // display: 'popup',
      // approvalPrompt: 'auto',
      prompt: 'select_account', //"consent"
    });
  }

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest() as Request;
      const from = (request.query.state as string)?.replace(/\@/g, '/');
      // response.setHeader('X-Frame-Options', 'SAMEORIGIN');
      // await super.logIn(request) //to enabling session / we dont need it

      const activate = (await super.canActivate(context)) as boolean;
      request.params.from = from;
      return activate;
    } catch (ex) {
      throw ex;
    }
  }
}
