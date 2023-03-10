import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { ChatService } from './chat.service';
import { RoomIntendedParticipantDto } from './dto/intendedParticipant/intended-participant.dto';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { MessageDto } from './dto/message/message.dto';
import { CreateRoomDto } from './dto/room/create-room.dto';
import { RoomDtoWithoutMessages } from './dto/room/room.dto';
import { RoomAuthGuard } from './guards/addMsg.guard';

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

  @Post('confirm-join-room-request')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.chatAppUserLL)
  @Serialize(RoomIntendedParticipantDto)
  async confirmJoinRequest(@CurrentUser() user: User, @Body('id') id: number) {
    const qry = await this.chatService.confirmJoinRequest(user, id)
    return qry
  }

  @Post('reject-join-room-request')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.chatAppUserLL)
  @Serialize(RoomIntendedParticipantDto)
  async rejectJoinRequest(@CurrentUser() user: User, @Body('id') id: number) {
    const qry = await this.chatService.rejectJoinRequest(user, id)
    return qry
  }

  @Post('add-message')
  @UseGuards(AccessTokenGuard, RolesGuard, RoomAuthGuard)
  @Roles(UserRoles.chatAppUserLL)
  @Serialize(MessageDto)
  async addMessage(@CurrentUser() user: User, @Body() body: CreateMessageDto) {
    const qry = await this.chatService.addMessage(user, body)
    return qry
  }

  @Get('messages/:roomId')
  @UseGuards(AccessTokenGuard, RolesGuard, RoomAuthGuard)
  @Roles(UserRoles.chatAppUserLL)
  @Serialize(MessageDto)
  async getMessages(@CurrentUser() user: User, @Param('roomId') roomId: number) {
    const qry = await this.chatService.getMessages(user, roomId)
    return qry
  }

  @Get('test')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.chatAppUserLL)
  whereRU() {
    return { msg: 'hello, you are in chat app.' };
  }
}
