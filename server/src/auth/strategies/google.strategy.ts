import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly usersService: UsersService,
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
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails, photos } = profile;

    console.log('accessToken', _accessToken);
    console.log('refreshToken', _refreshToken);
    console.log('id', id);
    console.log('name', name);
    console.log('emails', emails);
    console.log('photos', photos);

    const user = await this.authService.googleValidateUser(emails[0].value);

    // Here a custom User object is returned. In the the repo I'm using a UsersService with repository pattern, learn more here: https://docs.nestjs.com/techniques/database
    return (
      {
        ...user,
        provider: 'google',
        providerId: id,
        name: name.givenName,
        username: emails[0].value,
      } || null
    );
  }
}
