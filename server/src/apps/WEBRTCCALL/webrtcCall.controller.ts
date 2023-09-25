import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { MyConferenceLinkDto } from './dto/room/room.dto';
import { WEBRTCCallService } from './webrtcCall.service';

@Controller('webrtcCall_app')
export class WEBRTCCallController {
  constructor(private webrtcCallService: WEBRTCCallService) { }

  @Get('socket_initializing')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.webrtcCallAppUserLL)
  async socketInitilizing() {
    return {
      onlineUsers: {},
    };
  }

  @Get('get_my_conference_link')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.webrtcCallAppUserLL)
  @Serialize(MyConferenceLinkDto)
  async getMyConferenceLink(@CurrentUser() user: User) {
    return this.webrtcCallService.getMyConferenceLink(user);
  }

  @Get('whereRU')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.webrtcCallAppUserLL)
  whereRU() {
    return { msg: 'hello, you are in webrtcCall app.' };
  }
}
