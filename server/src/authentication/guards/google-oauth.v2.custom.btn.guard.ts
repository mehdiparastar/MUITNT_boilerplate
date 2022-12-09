import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { OAuth2Client } from 'google-auth-library';
import { authTypeEnum } from 'src/enum/authType.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthV2CustomBTNGuard {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly authService: AuthService, // protected client: OAuth2Client,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { code } = request.body;
    const client = new OAuth2Client(
      this.configService.get<string>('OAUTH_GOOGLE_ID'),
      this.configService.get<string>('OAUTH_GOOGLE_SECRET'),
      'postmessage',
    );

    const res = await client.getToken(code);
    
    const ticket = await client.verifyIdToken({
      idToken: res.tokens.id_token,
      audience: this.configService.get<string>('OAUTH_GOOGLE_ID'),
    });

    const googleUser: IGoogleUser = {
      provider: authTypeEnum.google,
      providerId: ticket.getPayload()?.sub,
      name: ticket.getPayload()?.name,
      email: ticket.getPayload()?.email,
      photo: ticket.getPayload()?.picture,
    };

    const user = await this.authService.googleUserValidate(googleUser);

    request.user = {
      ...user,
      ...googleUser,
    };

    return true;
    // const activate = (await super.canActivate(context)) as boolean;
    // await super.logIn(request); to enabling session / we dont need it
    // return activate;
  }

  // async verifyGoogleToken(token: string) {
  //   try {
  //     const ticket = await this.client.verifyIdToken({
  //       idToken: token,
  //       audience: this.configService.get<string>('OAUTH_GOOGLE_ID'),
  //     });
  //     return { payload: ticket.getPayload() };
  //   } catch (error) {
  //     return { error: 'Invalid user detected. Please try again' };
  //   }
  // }
}
