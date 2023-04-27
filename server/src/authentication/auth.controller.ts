import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { strToBool } from 'src/helperFunctions/strToBool';
import { CreatePermissionRequestDto } from 'src/users/dto/permissionRequest/create-permission-request.dto';
import { PaginationPermissionRequestDto } from 'src/users/dto/permissionRequest/pagination-permission-request.dto';
import { PermissionRequestDto } from 'src/users/dto/permissionRequest/permission-request.dto';
import { ChangeLocalUserProfileDetailDto } from 'src/users/dto/user/change-local-user-profile-detail.dto';
import { UserPermissionRequest } from 'src/users/entities/permission-requests.entity';
import { PermissionRequestsService } from 'src/users/permissionRequests.service';

import { Roles } from '../authorization/roles.decorator';
import { RolesGuard } from '../authorization/roles.guard';
import { UserRoles } from '../enum/userRoles.enum';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.middleware';
import { JWTTokenDto } from '../users/dto/jwt/token.dto';
import { ChangeLocalUserEmailDto } from '../users/dto/user/change-local-user-email.dto';
import { ChangeLocalUserPasswordDto } from '../users/dto/user/change-local-user-password.dto';
import { CreateLocalUserDto } from '../users/dto/user/create-local-user.dto';
import { UserDto } from '../users/dto/user/user.dto';
import { ApproveUserRolesDto } from '../users/dto/userRoles/approve-user-roles.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { TestOrDevModeGuard } from './guards/test-or-dev-mode.guard';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly permissionRequestService: PermissionRequestsService,
    private configService: ConfigService<IconfigService>,
  ) {}

  @Post('local-create')
  @Serialize(JWTTokenDto)
  async create(@Body() body: CreateLocalUserDto): Promise<IJWTTokensPair> {
    return this.authService.createNewLocalUser(
      body.email,
      body.password,
      body.name,
      body.photo,
    );
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Serialize(JWTTokenDto)
  async login(@Req() req: Request): Promise<IJWTTokensPair> {
    return this.authService.login(req.user);
  }

  @Get('google-logins/:from')
  @UseGuards(GoogleOauthGuard)
  async googleLogin(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const auth = await this.authService.login(req.user);
    const clientPort = this.configService.get<number>('CLIENT_PORT');

    res.redirect(
      `http://localhost:${clientPort}/google-oauth-success-redirect/${auth.accessToken}/${auth.refreshToken}${req.params.from}`,
    );
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  logout(@Req() req: Request): Promise<User> {
    return this.authService.logout((req.user as User).id);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request): Promise<IJWTTokensPair> {
    const id = (req.user as User).id;
    const refreshToken = (req.user as User).refreshToken;
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

  @Patch('approve-role-as-superuser/:email')
  @UseGuards(AccessTokenGuard, TestOrDevModeGuard)
  @Serialize(UserDto)
  approveSuperUser(@Param('email') email: string): Promise<User> {
    return this.usersService.approveRoleAsSuperUser(email);
  }

  @Patch('change-email')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  changeEmail(
    @CurrentUser() user: User,
    @Body() body: ChangeLocalUserEmailDto,
  ): Promise<User> {
    return this.usersService.changeUserEmail(user.id, body.email);
  }

  @Patch('change-profile-detail')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  changeProfileDetail(
    @CurrentUser() user: User,
    @Body() body: ChangeLocalUserProfileDetailDto,
  ): Promise<User> {
    return this.usersService.changeLocalUserProfileDetail(
      user.id,
      body.name,
      body.photo,
    );
  }

  @Patch('change-password')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  changePassword(
    @CurrentUser() user: User,
    @Body() body: ChangeLocalUserPasswordDto,
  ): Promise<User> {
    return this.usersService.changeUserPassword(user.id, body.password);
  }

  @Get('all')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  @Serialize(UserDto)
  async findAll(): Promise<User[]> {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.usersService.findAll();
  }

  @Get('find-by-email')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
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
  @Roles(UserRoles.superUser, UserRoles.admin)
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

  @Post('create-permission-request')
  @UseGuards(AccessTokenGuard)
  @Serialize(PermissionRequestDto)
  async createPermissionRequest(
    @CurrentUser() user: User,
    @Body() body: CreatePermissionRequestDto,
  ): Promise<UserPermissionRequest> {
    return this.permissionRequestService.create(user, body.role);
  }

  @Get('get-my-all-permission-requests')
  @UseGuards(AccessTokenGuard)
  @Serialize(PaginationPermissionRequestDto)
  async getMyAllPReqs(
    @CurrentUser() user: User,
    @Query('accepted') accepted: boolean = false,
    @Query('rejected') rejected: boolean = false,
    @Query('unSeen') unSeen: boolean = false,
    @Query('seen') seen: boolean = false,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 3,
  ) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return await this.permissionRequestService.findMyAll(
      user,
      limit,
      skip,
      strToBool(accepted),
      strToBool(rejected),
      strToBool(unSeen),
      strToBool(seen),
    );
  }

  @Delete('delete-permission-request/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(PermissionRequestDto)
  removePReq(@CurrentUser() user: User, @Param('id') id: string) {
    return this.permissionRequestService.remove(user, parseInt(id));
  }

  @Get('get-all-permission-requests-to-approve')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser)
  @Serialize(PaginationPermissionRequestDto)
  async getAllPReqsToApprove(
    @CurrentUser() user: User,
    @Query('accepted') accepted: boolean = false,
    @Query('rejected') rejected: boolean = false,
    @Query('unSeen') unSeen: boolean = false,
    @Query('seen') seen: boolean = false,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 3,
    @Query('selectedUserId') selectedUserId: string | null | undefined = null,
  ) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return await this.permissionRequestService.findAllToApprove(
      user,
      limit,
      skip,
      strToBool(accepted),
      strToBool(rejected),
      strToBool(unSeen),
      strToBool(seen),
      selectedUserId,
    );
  }

  @Patch('set-seen-preq')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser)
  pReqSetToSeen(
    @CurrentUser() user: User,
    @Body('pReqId') pReqId: number,
  ): Promise<UserPermissionRequest> {
    return this.permissionRequestService.pReqSetToSeen(user, pReqId);
  }

  @Patch('set-approve-preq')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser)
  async approvePReq(
    @CurrentUser() user: User,
    @Body('pReqId') pReqId: number,
  ): Promise<UserPermissionRequest> {
    const pReq = await this.permissionRequestService.findOneById(pReqId);
    const updatePermission = await this.usersService.update(pReq.user.id, {
      roles: [...new Set([...pReq.user.roles, pReq.role])],
    });
    return this.permissionRequestService.approvePReq(user, pReqId);
  }

  @Patch('set-reject-preq')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser)
  async rejectPReq(
    @CurrentUser() user: User,
    @Body('pReqId') pReqId: number,
  ): Promise<UserPermissionRequest> {
    const pReq = await this.permissionRequestService.findOneById(pReqId);
    const updatePermission = await this.usersService.update(pReq.user.id, {
      roles: pReq.user.roles.filter((item) => item !== pReq.role),
    });
    return this.permissionRequestService.rejectPReq(user, pReqId);
  }
}
