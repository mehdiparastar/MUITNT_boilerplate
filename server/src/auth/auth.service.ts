import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hashData } from '../helperFunctions/hash-data';
import { validateHashedData } from '../helperFunctions/validate-hashed-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    protected configService: ConfigService<IconfigService>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
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

  async createNewUser(
    email: string,
    password: string,
  ): Promise<IJWTTokensPair> {
    // Hash password
    const hashedPassword = await hashData(password);

    // Create new User
    const newUser = await this.usersService.create(email, hashedPassword);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(user: Partial<User>): Promise<IJWTTokensPair> {
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.usersService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(id: number, email: string): Promise<IJWTTokensPair> {
    const payload = { email, sub: id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '10m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(id: number): Promise<User> {
    return this.usersService.update(id, { refreshToken: null });
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
}
