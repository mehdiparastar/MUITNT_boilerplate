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
} from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApproveUserRolesDto } from './dto/userRoles/approve-user-roles.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/enum/userRoles.enum';
import { CurrentUser } from './decorators/current-user.middleware';
import { User } from './entities/user.entity';

@Controller()
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('auth/signup')
  async create(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    session.userRoles = Object.keys(user.roles).filter(
      (item) => user.roles[item] === true,
    );
    return user;
  }

  @Post('auth/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('auth/signout')
  @UseGuards(AuthGuard)
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Patch('auth/change-user-roles/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  approveUserRoles(@Param('id') id: string, @Body() body: ApproveUserRolesDto) {
    return this.usersService.changeUserRoles(parseInt(id), body);
  }

  @Get('auth/whoami')
  @UseGuards(AuthGuard)
  @Roles(
    UserRoles.section1ExpertL2,
    UserRoles.section2ExpertL2,
    UserRoles.section3ExpertL2,
  )
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Patch('auth/change-email')
  @UseGuards(AuthGuard)
  changeEmail(@CurrentUser() user: User, @Body('email') email: string) {
    return this.authService.changeUserEmail(user.id, email);
  }

  
  @Patch('auth/change-password')
  @UseGuards(AuthGuard)
  changePassword(@CurrentUser() user: User, @Body('password') password: string) {
    return this.authService.changeUserPassword(user.id, password);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
