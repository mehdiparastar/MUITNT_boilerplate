import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { authTypeEnum } from '../../enum/authType.enum';

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
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;

      const googleUser: IGoogleUser = {
        provider: authTypeEnum.google,
        providerId: id,
        name: name.givenName,
        email: emails[0].value,
        photo: photos[0].value,
        accessToken,
        refreshToken,
      };

      const user = await this.authService.googleUserValidate(googleUser);

      done(null, {
        ...user,
        ...googleUser,
      });
    } catch (err) {
      done(err, null);
    }
  }
}
