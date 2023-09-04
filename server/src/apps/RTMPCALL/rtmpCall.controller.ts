import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { RTMPCallService } from './rtmpCall.service';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MyConferenceLinkDto } from './dto/room/room.dto';
import { Request } from 'express';

@Controller('rtmpCall_app')
export class RTMPCallController {
  constructor(private rtmpCallService: RTMPCallService) { }

  @Get('socket_initializing')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.rtmpCallAppUserLL)
  async socketInitilizing() {
    return {
      onlineUsers: {},
    };
  }

  @Get('get_my_conference_link')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.rtmpCallAppUserLL)
  @Serialize(MyConferenceLinkDto)
  async getMyConferenceLink(@CurrentUser() user: User) {
    return this.rtmpCallService.getMyConferenceLink(user);
  }

  @Get('whereRU')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.rtmpCallAppUserLL)
  whereRU() {
    return { msg: 'hello, you are in rtmpCall app.' };
  }
}
