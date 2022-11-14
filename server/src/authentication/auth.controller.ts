import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dto/user/user.dto';
import { AuthService } from './auth.service';
import { ApproveUserRolesDto } from '../users/dto/userRoles/approve-user-roles.dto';
import { UsersService } from '../users/users.service';
import { Roles } from '../authorization/roles.decorator';
import { UserRoles } from '../enum/userRoles.enum';
import { CurrentUser } from '../users/decorators/current-user.middleware';
import { User } from '../users/entities/user.entity';
import {  ApiTags } from '@nestjs/swagger';
import { ChangeUserEmailDto } from '../users/dto/user/change-email.dto';
import { ChangeUserPasswordDto } from '../users/dto/user/change-password.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWTTokenDto } from '../users/dto/jwt/token.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { RolesGuard } from '../authorization/roles.guard';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('create')
  @Serialize(JWTTokenDto)
  async create(@Body() body: CreateUserDto): Promise<IJWTTokensPair> {
    return this.authService.createNewUser(body.email, body.password);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Serialize(JWTTokenDto)
  async login(@Req() req: Request): Promise<IJWTTokensPair> {
    return this.authService.login(req.user);
  }

  @Get('google-logins')
  @UseGuards(GoogleOauthGuard)
  async googleLogin(@Req() req: Request, @Res() res: Response) {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(
    UserRoles.section1ExpertL2,
    UserRoles.section2ExpertL2,
    UserRoles.section3ExpertL2,
  )
  @Serialize(UserDto)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  logout(@Req() req: Request): Promise<User> {
    return this.authService.logout(req.user.id);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request): Promise<IJWTTokensPair> {
    const id = req.user.id;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(id, refreshToken);
  }

  @Patch('change-user-roles/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  @Serialize(UserDto)
  approveUserRoles(
    @Param('id') id: string,
    @Body() body: ApproveUserRolesDto,
  ): Promise<User> {
    return this.usersService.changeUserRoles(parseInt(id), body);
  }

  @Patch('change-email')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  changeEmail(
    @CurrentUser() user: User,
    @Body() body: ChangeUserEmailDto,
  ): Promise<User> {
    return this.usersService.changeUserEmail(user.id, body.email);
  }

  @Patch('change-password')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  changePassword(
    @CurrentUser() user: User,
    @Body() body: ChangeUserPasswordDto,
  ): Promise<User> {
    return this.usersService.changeUserPassword(user.id, body.password);
  }

  @Get('all')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  @Serialize(UserDto)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('find-by-email')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(
    UserRoles.superUser,
    UserRoles.admin,
    UserRoles.adminSection1,
    UserRoles.adminSection2,
    UserRoles.adminSection3,
  )
  @Serialize(UserDto)
  async findAllByEmail(@Query('email') email: string): Promise<User[]> {
    const users: User[] = await this.usersService.findByEmail(email);
    if (!users.length) {
      throw new NotFoundException('user not found');
    }
    return users;
  }

  @Get('find-by-id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(
    UserRoles.superUser,
    UserRoles.admin,
    UserRoles.adminSection1,
    UserRoles.adminSection2,
    UserRoles.adminSection3,
  )
  @Serialize(UserDto)
  async findOneById(@Query('id') id: string): Promise<User> {
    const user: User = await this.usersService.findOneById(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Delete('delete-user/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser)
  @Serialize(UserDto)
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(parseInt(id));
  }
}
