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
} from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApproveUserRolesDto } from './dto/userRoles/approve-user-roles.dto';
import { UsersService } from './users.service';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../enum/userRoles.enum';
import { CurrentUser } from './decorators/current-user.middleware';
import { User } from './entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { ChangeUserEmailDto } from './dto/user/change-email.dto';
import { ChangeUserPasswordDto } from './dto/user/change-password.dto';

@ApiTags('users')
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async create(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    session.userRoles = Object.keys(user.roles).filter(
      (item) => user.roles[item] === true,
    );
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    console.log('catching req ...')
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    session.userRoles = Object.keys(user.roles).filter(
      (item) => user.roles[item] === true,
    );
    return user;
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  signout(@Session() session: any) {
    session.userId = null;
    session.userRoles = [];
  }

  @Patch('change-user-roles/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  approveUserRoles(@Param('id') id: string, @Body() body: ApproveUserRolesDto) {
    return this.usersService.changeUserRoles(parseInt(id), body);
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  @Roles(
    UserRoles.section1ExpertL2,
    UserRoles.section2ExpertL2,
    UserRoles.section3ExpertL2,
  )
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Patch('change-email')
  @UseGuards(AuthGuard)
  changeEmail(@CurrentUser() user: User, @Body() body: ChangeUserEmailDto) {
    return this.authService.changeUserEmail(user.id, body.email);
  }

  @Patch('change-password')
  @UseGuards(AuthGuard)
  changePassword(
    @CurrentUser() user: User,
    @Body() body: ChangeUserPasswordDto,
  ) {
    return this.authService.changeUserPassword(user.id, body.password);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find-by-email')
  @UseGuards(AuthGuard)
  @Roles(
    UserRoles.superUser,
    UserRoles.admin,
    UserRoles.adminSection1,
    UserRoles.adminSection2,
    UserRoles.adminSection3,
  )
  async findAllByEmail(@Query('email') email: string) {
    const users: User[] = await this.usersService.findByEmail(email);
    if (!users.length) {
      throw new NotFoundException('user not found');
    }
    return users;
  }

  @Get('find-by-id')
  @UseGuards(AuthGuard)
  @Roles(
    UserRoles.superUser,
    UserRoles.admin,
    UserRoles.adminSection1,
    UserRoles.adminSection2,
    UserRoles.adminSection3,
  )
  async findOneById(@Query('id') id: string) {
    const user: User = await this.usersService.findOneById(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Delete('delete-user/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.superUser)
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
