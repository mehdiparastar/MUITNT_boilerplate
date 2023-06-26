import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { authTypeEnum } from '../enum/authType.enum';
import { hashData } from '../helperFunctions/hash-data';
import { validateHashedData } from '../helperFunctions/validate-hashed-data';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async localUserValidate(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user.provider !== authTypeEnum.local) {
      throw new NotAcceptableException(
        `${email} address has registered via ${user.provider}!`,
      );
    }

    const passwordValidation = await validateHashedData(
      password,
      user.password,
    );

    if (user && passwordValidation) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async googleUserValidate(
    googleUser: IGoogleUser,
  ): Promise<Partial<User> | null> {
    const [user] = await this.usersService.findByEmail(googleUser.email);
    if (!user) {
      const newUser = await this.usersService.createUserWithGoogle(googleUser);
      return newUser;
    }
    if (user.provider !== authTypeEnum.google) {
      throw new NotAcceptableException(
        `${googleUser.email} address has registered via ${user.provider}!`,
      );
    }
    if (user) {
      return user;
    }

    return null;
  }

  async createNewLocalUser(
    email: string,
    password: string,
    name: string,
    photo?: string,
  ): Promise<IJWTTokensPair> {
    // Hash password
    const hashedPassword = await hashData(password);

    // Create new User
    const newUser = await this.usersService.createUserWithUserPass(
      email,
      hashedPassword,
      name,
      photo,
    );

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(user: Partial<User>): Promise<IJWTTokensPair> {
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this.updateStreamToken(user.id, tokens.streamToken);    
    return tokens;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.usersService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async updateStreamToken(id: number, streamToken: string) {
    // const hashedStreamToken = await hashData(streamToken);
    await this.usersService.update(id, {
      streamToken: streamToken,
    });
  }

  async getTokens(id: number, email: string): Promise<IJWTTokensPair> {
    const payload = { email, sub: id };
    const [accessToken, refreshToken, streamToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string | number>(
          'JWT_ACCESS_EXPIRATION_TIME',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string | number>(
          'JWT_REFRESH_EXPIRATION_TIME',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_STREAM_SECRET'),
        expiresIn: this.configService.get<string | number>('JWT_STREAM_EXPIRATION_TIME'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      streamToken,
    };
  }

  async logout(id: number): Promise<User> {
    return this.usersService.update(id, {
      refreshToken: null,
      streamToken: null,
    });
  }

  async refreshTokens(
    id: number,
    refreshToken: string,
  ): Promise<IJWTTokensPair> {
    const user = await this.usersService.findOneById(id);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await validateHashedData(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  whereRU(): string {
    return 'hello, you are in authenticating.';
  }
}
