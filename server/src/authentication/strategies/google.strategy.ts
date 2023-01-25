import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  GoogleCallbackParameters,
  Profile,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';

import { authTypeEnum } from '../../enum/authType.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('OAUTH_GOOGLE_ID'),
      clientSecret: configService.get<string>('OAUTH_GOOGLE_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  authenticate(req: any, options: any) {

    if (!options?.state) {
      options = { ...options, state: req.params.from }
    } 
    
    return super.authenticate(req, options)
  }

  async validate(
    req: any, // if passReqToCallback: true then this line is required else this should be cleaned.
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    params: GoogleCallbackParameters,
  ): Promise<any> {
    const googleUser: IGoogleUser = {
      provider: authTypeEnum.google,
      providerId: profile?.id,
      name: profile?.name.givenName,
      email: profile?.emails[0].value,
      photo: profile?.photos[0].value,
      accessToken,
      refreshToken,
    };

    const user = await this.authService.googleUserValidate(googleUser);

    return {
      ...user,
      ...googleUser,
    };
  }
}
