import {
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chatIntendedParticipantStatus } from 'src/enum/chatIntendedParticipantStatus.enum';
import { UserDto } from 'src/users/dto/user/user.dto';
import { User } from 'src/users/entities/user.entity';
import { In, Repository, Not } from 'typeorm';
import { ChatGateway } from './chat.gateway';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { CreateRoomDto } from './dto/room/create-room.dto';
import { UpdateRoomDto } from './dto/room/update-room.dto';
import { ChatIntendedParticipants } from './entities/intendedParticipants.entity';
import { ChatMessage } from './entities/messages.entity';
import { ChatRoom } from './entities/room.entity';
import { Socket } from 'socket.io'
import { getArrayOfObjectUniqulyByKey } from 'src/helperFunctions/get-array-of-object-unique-by-key';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private roomsRepo: Repository<ChatRoom>,
    @InjectRepository(ChatMessage)
    private messagesRepo: Repository<ChatMessage>,
    @InjectRepository(ChatIntendedParticipants)
    private intendedParticipantsRepo: Repository<ChatIntendedParticipants>,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateWay: ChatGateway
  ) { }

  async createRoom(user: User, createRoomDto: CreateRoomDto): Promise<ChatRoom> {
    // Create new Post
    const { title, caption, intendedParticipants, ...rest } = createRoomDto
    const newRoom = this.roomsRepo.create({
      creator: user,
      title,
      caption,
      ...rest
    });

    const newRoomSave = await this.roomsRepo.save(newRoom)

    await this.sendJoinReqToIntendedUsers(user, intendedParticipants, newRoom)

    return newRoomSave
  }

  async sendJoinReqToIntendedUsers(user: User, intendedParticipants: UserDto[], room: ChatRoom): Promise<ChatIntendedParticipants[]> {

    const newIntendedParticipants = intendedParticipants.map(intendedParticipant => this.intendedParticipantsRepo.create({
      creator: user,
      participant: intendedParticipant,
      room: room
    }))

    const save = await Promise.all(newIntendedParticipants.map(item => this.intendedParticipantsRepo.save(item)))
    return save
  }

  async findMyAllRooms(user: User) {
    try {
      const rooms = (await this.roomsRepo.find({
        relations: {
          creator: true,
          intendedParticipants: {
            participant: true
          },
          messages: { status_delivered_users: true },
        },
        order: { createdAt: 'DESC' },
      }))

      const filteredRooms = rooms.filter(
        room =>
          (room.closed === false && room.creator.id === user.id)
          ||
          (
            room.closed === false &&
            room.intendedParticipants.filter(item => item.status === chatIntendedParticipantStatus.accepted)
              .map(item => item.participant.id).includes(user.id)
          )
      );

      const deliverdAddedToMyRoomsMessages = await Promise.all(
        filteredRooms.map(room => {
          let need = false
          const roomNewMessages = room.messages.map(msg => {
            if ((msg.status_delivered_users || []).map(usr => usr.id).includes(user.id)) {
              need = false
              return msg
            } else {
              need = true
              return {
                ...msg,
                status_delivered_users: [...msg.status_delivered_users, user]
              }
            }
          })
          if (need) {
            return this.roomsRepo.save({
              ...room,
              messages: roomNewMessages
            })
          }
          else {
            return room
          }
        })
      )

      const uniqueOnlineUsers = (await Promise.all(
        deliverdAddedToMyRoomsMessages.map(room => {
          return ((this.chatGateWay.io.in(room.id.toString()).fetchSockets()))
        })
      )).reduce((p, c: any[], i) => ({
        ...p,
        [deliverdAddedToMyRoomsMessages[i].id]: getArrayOfObjectUniqulyByKey(c.map(item => item.user).filter(x => x !== undefined), 'id')
      }), {})


      return deliverdAddedToMyRoomsMessages.map((room, index) => {
        return (
          {
            ...room,
            onlineUsers:
              uniqueOnlineUsers[room.id] as User[],
            // this.chatGateWay.io.adapter.rooms?.get(room.id.toString())?.size ?? 0
          }
        )
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  async findMyAllRequests(user: User) {
    const qryRes = (await this.intendedParticipantsRepo.find({
      relations: {
        creator: true,
        participant: true,
        room: true
      },
      order: { createdAt: 'DESC' },
    })).filter(intendedParticipant => intendedParticipant.participant.id === user.id && intendedParticipant.status === chatIntendedParticipantStatus.requested);

    return qryRes
  }

  async findAllRoom(
    skip: number = 0,
    limit: number = 3,
  ): Promise<{ data: ChatRoom[]; count: number }> {
    // Create new Post
    const [result, total] = await this.roomsRepo.findAndCount({
      relations: {
        creator: true,
        intendedParticipants: true,
      },
      where: { closed: false },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOneRoomById(id: number): Promise<ChatRoom> {
    if (!id) {
      throw new NotFoundException('room not found');
    }
    const find = await this.roomsRepo.findOne({
      relations: {
        creator: true,
        intendedParticipants: true,
        messages: true
      },
      where: { id, closed: false },
    });
    if (!find) {
      throw new NotFoundException('room not found');
    }
    return find;
  }

  async findOneIntendedParticipantById(id: number): Promise<ChatIntendedParticipants> {
    if (!id) {
      throw new NotFoundException('participant not found');
    }
    const find = await this.intendedParticipantsRepo.findOne({
      relations: {
        creator: true,
        participant: true,
      },
      where: { id: id },
    });
    if (!find) {
      throw new NotFoundException('participant not found');
    }
    return find;
  }

  async findOneByIdForHardRemove(id: number): Promise<ChatRoom> {
    if (!id) {
      throw new NotFoundException('room not found');
    }
    const find = await this.roomsRepo.findOne({
      relations: {
        creator: true,
        intendedParticipants: true,
        messages: true
      },
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('room not found');
    }
    return find;
  }

  async removeRoom(user: User, id: number): Promise<ChatRoom> {
    const room = await this.findOneByIdForHardRemove(id);
    if (!room) {
      throw new NotFoundException('room not found');
    }
    if (room.creator.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove rooms that are your own!',
      );
    }
    return this.roomsRepo.remove(room);
  }

  async update(user: User, id: number, attrs: UpdateRoomDto): Promise<ChatRoom> {
    const room = await this.findOneRoomById(id);
    if (!room) {
      throw new NotFoundException('room not found');
    }
    if (!room.intendedParticipants.filter(el => el.isAdmin).map(item => item.id).includes(user.id)) {
      throw new NotAcceptableException(
        'You only could update rooms that you are as administrator!',
      );
    }
    Object.assign(room, attrs);
    return this.roomsRepo.save(room);
  }

  async confirmJoinRequest(user: User, id: number) {
    const intendedParticipsnt = await this.findOneIntendedParticipantById(id);
    if (!intendedParticipsnt) {
      throw new NotFoundException('intended participant not found');
    }
    if (intendedParticipsnt.participant.id !== user.id) {
      throw new NotAcceptableException(
        'You only could confirm your own requests!',
      );
    }

    Object.assign(intendedParticipsnt, { status: chatIntendedParticipantStatus.accepted });
    const save = await this.intendedParticipantsRepo.save(intendedParticipsnt);
    return save
  }

  async rejectJoinRequest(user: User, id: number) {
    const intendedPsrticipsnt = await this.findOneIntendedParticipantById(id);
    if (!intendedPsrticipsnt) {
      throw new NotFoundException('intended participant not found');
    }
    if (intendedPsrticipsnt.participant.id !== user.id) {
      throw new NotAcceptableException(
        'You only could reject your own requests!',
      );
    }

    Object.assign(intendedPsrticipsnt, { status: chatIntendedParticipantStatus.rejected });
    return this.intendedParticipantsRepo.save(intendedPsrticipsnt);
  }

  async roomMsgAuthorization(user: User, roomId: number) {
    const find = (await this.intendedParticipantsRepo.find({
      relations: {
        creator: true,
        participant: true,
        room: true
      },
      // where: [
      //   { creator: { id: user.id }, room: { id: roomId } },
      //   { participant: { id: user.id }, room: { id: roomId }, status: chatIntendedParticipantStatus.accepted },
      // ],
    }))
    const x = find.filter(intendedParticipant =>
      (intendedParticipant.creator.id === user.id && intendedParticipant.room.id === roomId) ||
      (
        intendedParticipant.participant.id === user.id &&
        intendedParticipant.room.id === roomId &&
        intendedParticipant.status === chatIntendedParticipantStatus.accepted
      )
    );
    return find.length > 0
  }

  async addMessage(user: User, body: CreateMessageDto) {

    const room = await this.findOneRoomById(body.roomId)

    const newMsg = this.messagesRepo.create({
      message: body.message,
      room: room,
      writer: user,

    })

    const save = await this.messagesRepo.save(newMsg)

    this.chatGateWay.io.to(save.room.id.toString()).emit('new_message', save)
    this.chatGateWay.io.to(save.room.id.toString()).emit('deliver_message', save)
    this.chatGateWay.io.server.emit('deliver_message', save)

    const onlineUsers =
      [...new Map(
        ((await this.chatGateWay.io.in(room.id.toString()).fetchSockets()) as unknown as (Socket & { user: User })[]).map(item => item.user)
          .map(item =>
            [item['id'], item])).values()];

    const messages = (await this.messagesRepo.find({
      where: {
        room: { id: room.id },
      },
      relations: { status_delivered_users: true }
    }))

    const update = await Promise.all(messages.map(msg => {
      const toAddOnlineUser = onlineUsers.filter(usr => !msg.status_delivered_users.includes(usr))
      if (toAddOnlineUser.length === 0) {
        return msg
      }
      else {
        return this.messagesRepo.save({
          ...msg,
          status_delivered_users: [...msg.status_delivered_users, ...toAddOnlineUser]
        })
      }
    }))

    return save
  }



  async getMessages(user: User, roomId: number) {
    const [room] = await this.roomsRepo.find({
      relations: {
        creator: true,
        intendedParticipants: { participant: true }
      },
      where: {
        id: roomId
      }
    })

    const members = [
      ...room.intendedParticipants.filter(participant => participant.status === chatIntendedParticipantStatus.accepted).map(item => item.participant.id),
      room.creator.id
    ].sort()

    const messages = await this.messagesRepo.find({
      relations: {
        writer: true,
        room: true,
        status_delivered_users: true,
        status_seen_users: true
      },
      where: {
        room: {
          id: roomId
        }
      },
      order: { updatedAt: 'ASC' }
    })

    const addingSeenStatus = messages.map(
      msg => {
        const deliveredWithCurrentUser = msg.status_delivered_users.map(item => item.id).includes(user.id) ?
          msg.status_delivered_users :
          [...msg.status_delivered_users, user]

        const seenWithCurrentUser = msg.status_seen_users.map(item => item.id).includes(user.id) ?
          msg.status_seen_users :
          [...msg.status_seen_users, user]

        return (
          {
            ...msg,
            status_delivered_users: deliveredWithCurrentUser,
            status_seen_users: seenWithCurrentUser,
            isDelivered: JSON.stringify(deliveredWithCurrentUser.map(item => item.id).sort()) === JSON.stringify(members),
            isSeen: JSON.stringify(seenWithCurrentUser.map(item => item.id).sort()) === JSON.stringify(members),
          }
        )
      }
    )

    const updated = await Promise.all(addingSeenStatus.map(msg => this.messagesRepo.save(msg)))

    return updated
  }

  whereRU(): string {
    return 'hello, you are in service of chat app.';
  }
}

