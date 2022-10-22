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

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  signout(@Session() session: any) {
    session.userId = null;
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
