import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      usernameField: 'email',
    });
  }

  async validate(payload: IJwtPayload) {
    if (payload.sub) {
      const { password, ...rest } = await this.usersService.findOneById(
        payload.sub,
      );
      return rest;
    }
    return { id: payload.sub, email: payload.email };
  }

  success(user: any, info?: any): void {
      console.log('user')
  }
}
