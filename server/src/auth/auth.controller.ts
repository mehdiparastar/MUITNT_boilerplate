import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UseGuards,
  Query,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dto/user/user.dto';
// import { AuthService } from './auth.service';
import { AuthService } from './auth.service';
// import { AuthGuard } from '../guards/auth.guard';
import { ApproveUserRolesDto } from '../users/dto/userRoles/approve-user-roles.dto';
import { UsersService } from '../users/users.service';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../enum/userRoles.enum';
import { CurrentUser } from '../users/decorators/current-user.middleware';
import { User } from '../users/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../users/dto/user/update-user.dto';
import { ChangeUserEmailDto } from '../users/dto/user/change-email.dto';
import { ChangeUserPasswordDto } from '../users/dto/user/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRolesDto } from '../users/dto/userRoles/user-roles.dto';
import { JWTTokenDto } from '../users/dto/jwt/token.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

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
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  logout(@Req() req: Request) {
    this.authService.logout(req.user.id);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request): Promise<IJWTTokensPair> {
    const id = req.user.id;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(id, refreshToken);
  }

  @Patch('change-user-roles/:id')
  @UseGuards(AccessTokenGuard)
  // @Roles(UserRoles.superUser, UserRoles.admin)
  approveUserRoles(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ApproveUserRolesDto,
  ) {
    return this.usersService.changeUserRoles(parseInt(id), body);
  }

  // @Get('whoami')
  // @UseGuards(AuthGuard)
  // @Roles(
  //   UserRoles.section1ExpertL2,
  //   UserRoles.section2ExpertL2,
  //   UserRoles.section3ExpertL2,
  // )
  // whoAmI(@CurrentUser() user: User) {
  //   return user;
  // }

  // @Patch('change-email')
  // @UseGuards(AuthGuard)
  // changeEmail(@CurrentUser() user: User, @Body() body: ChangeUserEmailDto) {
  //   return this.authService.changeUserEmail(user.id, body.email);
  // }

  // @Patch('change-password')
  // @UseGuards(AuthGuard)
  // changePassword(
  //   @CurrentUser() user: User,
  //   @Body() body: ChangeUserPasswordDto,
  // ) {
  //   return this.authService.changeUserPassword(user.id, body.password);
  // }

  // @Get('all')
  // @UseGuards(AuthGuard)
  // @Roles(UserRoles.superUser, UserRoles.admin)
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get('find-by-email')
  // @UseGuards(AuthGuard)
  // @Roles(
  //   UserRoles.superUser,
  //   UserRoles.admin,
  //   UserRoles.adminSection1,
  //   UserRoles.adminSection2,
  //   UserRoles.adminSection3,
  // )
  // async findAllByEmail(@Query('email') email: string) {
  //   const users: User[] = await this.usersService.findByEmail(email);
  //   if (!users.length) {
  //     throw new NotFoundException('user not found');
  //   }
  //   return users;
  // }

  // @Get('find-by-id')
  // @UseGuards(AuthGuard)
  // @Roles(
  //   UserRoles.superUser,
  //   UserRoles.admin,
  //   UserRoles.adminSection1,
  //   UserRoles.adminSection2,
  //   UserRoles.adminSection3,
  // )
  // async findOneById(@Query('id') id: string) {
  //   const user: User = await this.usersService.findOneById(parseInt(id));
  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }
  //   return user;
  // }

  // @Delete('delete-user/:id')
  // @UseGuards(AuthGuard)
  // @Roles(UserRoles.superUser)
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(parseInt(id));
  // }
}
