import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { ChatService } from './chat.service';
import { RoomIntendedParticipantDto } from './dto/intendedParticipant/intended-participant.dto';
import { CreateRoomDto } from './dto/room/create-room.dto';
import { RoomDtoWithoutMessages } from './dto/room/room.dto';

@Controller('chat_app')
export class ChatController {
  constructor(private chatService: ChatService) { }

  @Post('create-room')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.chatAppUserLL)
  @Serialize(RoomDtoWithoutMessages)
  async create(@CurrentUser() user: User, @Body() createRoomDto: CreateRoomDto) {
    const result = await this.chatService.createRoom(user, createRoomDto);
    return result;
  }

  @Get('get-my-all-rooms')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.chatAppUserLL)
  @Serialize(RoomDtoWithoutMessages)
  async getMyAllRooms(@CurrentUser() user: User) {
    const qry = await this.chatService.findMyAllRooms(user)
    return qry
  }

  @Get('get-my-all-requests')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.chatAppUserLL)
  @Serialize(RoomIntendedParticipantDto)
  async getMyAllRequests(@CurrentUser() user: User) {
    const qry = await this.chatService.findMyAllRequests(user)
    return qry
  }

  @Get('test')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.chatAppUserLL)
  whereRU() {
    return { msg: 'hello, you are in chat app.' };
  }
}
