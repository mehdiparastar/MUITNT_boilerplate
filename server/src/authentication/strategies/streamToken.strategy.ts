import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class StreamTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-stream',
) {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_STREAM_SECRET'),
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
    console.log('user');
  }
}
