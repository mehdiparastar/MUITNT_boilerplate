import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { VideoCallService } from './videoCall.service';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MyConferenceLinkDto } from './dto/room/room.dto';

@Controller('videoCall_app')
export class VideoCallController {
  constructor(private videoCallService: VideoCallService) { }

  @Get('socket_initializing')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.videoCallAppUserLL)
  async socketInitilizing() {
    return {
      onlineUsers: {},
    };
  }

  @Get('get_my_conference_link')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.videoCallAppUserLL)
  @Serialize(MyConferenceLinkDto)
  async getMyConferenceLink(@CurrentUser() user: User) {
    return this.videoCallService.getMyConferenceLink(user);
  }

  @Get('whereRU')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.videoCallAppUserLL)
  whereRU() {
    return { msg: 'hello, you are in videoCall app.' };
  }
}
