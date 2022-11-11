import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Request as ExpressReq } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: ExpressReq, payload: IJwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    if (payload.sub) {
      const { password, ...rest } = await this.usersService.findOneById(
        payload.sub,
      );
      return { ...rest, refreshToken };
    }
    return { id: payload.sub, email: payload.email, refreshToken };
  }
}
