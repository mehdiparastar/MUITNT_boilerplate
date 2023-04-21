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
import { In, Repository } from 'typeorm';
import { ChatGateway } from './chat.gateway';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { CreateRoomDto } from './dto/room/create-room.dto';
import { UpdateRoomDto } from './dto/room/update-room.dto';
import { ChatIntendedParticipants } from './entities/intendedParticipants.entity';
import { ChatMessage } from './entities/messages.entity';
import { ChatRoom } from './entities/room.entity';
import { ChatDeliveredMessages } from './entities/deliveredMessages.entity';
import { ChatSeenMessages } from './entities/seenMessages.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private roomsRepo: Repository<ChatRoom>,
    @InjectRepository(ChatMessage)
    private messagesRepo: Repository<ChatMessage>,
    @InjectRepository(ChatIntendedParticipants)
    private intendedParticipantsRepo: Repository<ChatIntendedParticipants>,
    @InjectRepository(ChatDeliveredMessages)
    private deliveredMessagesRepo: Repository<ChatDeliveredMessages>,
    @InjectRepository(ChatSeenMessages)
    private seenMessagesRepo: Repository<ChatSeenMessages>,
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

    const roomCreator = this.intendedParticipantsRepo.create({
      creator: user,
      participant: user,
      room: room,
      status: chatIntendedParticipantStatus.accepted,
      isAdmin: true
    })

    const saveRoomCreator = await this.intendedParticipantsRepo.save(roomCreator)

    const newIntendedParticipants = intendedParticipants.map(intendedParticipant => this.intendedParticipantsRepo.create({
      creator: user,
      participant: intendedParticipant,
      room: room,
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
          messages: { delivered: true },
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

      return filteredRooms

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

  async findRoomById(id: number) {
    const qry = await this.roomsRepo.findOne({
      relations: {
        intendedParticipants: { participant: true, room: true, creator: true },
        creator: true,
      },
      where: {
        id: id
      }
    })
    return qry
  }

  async findIntendedParticipantById(id: number) {
    const qry = await this.intendedParticipantsRepo.findOne({
      relations: {
        room: { intendedParticipants: true },
        creator: true,
        participant: true,
      },
      where: {
        id: id
      }
    })
    return qry
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
    ].sort()

    const messages = await this.messagesRepo.find({
      relations: {
        writer: true,
        room: true,
        delivered: { intendedParticipant: { participant: true } },
        seen: { intendedParticipant: { participant: true } }
      },
      where: {
        room: {
          id: roomId
        }
      },
      order: { updatedAt: 'ASC' }
    })

    return messages.map(message => {
      return (
        {
          ...message,
          writer: {
            id: message.writer.id,
            email: message.writer.email,
            name: message.writer.name,
            photo: message.writer.photo
          },
          delivered: [
            message.delivered.map(item => (
              {
                id: item.intendedParticipant.participant.id,
                email: item.intendedParticipant.participant.email,
                name: item.intendedParticipant.participant.name,
              }
            ))
          ].flat(Infinity),
          seen: [
            message.seen.map(item => (
              {
                id: item.intendedParticipant.participant.id,
                email: item.intendedParticipant.participant.email,
                name: item.intendedParticipant.participant.name,
              }
            ))
          ].flat(Infinity),
          isDelivered: JSON.stringify(message.delivered.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
          isSeen: JSON.stringify(message.seen.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
        }
      )
    })


    // const addingSeenStatus = messages.map(
    //   msg => {
    //     const deliveredWithCurrentUser = msg.status_delivered_users.map(item => item.id).includes(user.id) ?
    //       msg.status_delivered_users :
    //       [...msg.status_delivered_users, user]

    //     const seenWithCurrentUser = msg.status_seen_users.map(item => item.id).includes(user.id) ?
    //       msg.status_seen_users :
    //       [...msg.status_seen_users, user]

    //     return (
    //       {
    //         ...msg,
    //         status_delivered_users: deliveredWithCurrentUser,
    //         status_seen_users: seenWithCurrentUser,
    //         isDelivered: JSON.stringify(deliveredWithCurrentUser.map(item => item.id).sort()) === JSON.stringify(members),
    //         isSeen: JSON.stringify(seenWithCurrentUser.map(item => item.id).sort()) === JSON.stringify(members),
    //       }
    //     )
    //   }
    // )

    // const updated = await Promise.all(addingSeenStatus.map(msg => this.messagesRepo.save(msg)))

    // return updated
  }

  async getMessage(user: User, messageId: number) {
    const message = await this.messagesRepo.findOne({
      relations: {
        writer: true,
        room: true,
        delivered: { intendedParticipant: { participant: true } },
        seen: { intendedParticipant: { participant: true } }
      },
      where: {
        id: messageId
      },
    })

    const [room] = await this.roomsRepo.find({
      relations: {
        creator: true,
        intendedParticipants: { participant: true }
      },
      where: {
        id: message.room.id
      }
    })

    const members = [
      ...room.intendedParticipants.filter(participant => participant.status === chatIntendedParticipantStatus.accepted).map(item => item.participant.id),
    ].sort()


    return {
      ...message,
      writer: {
        id: message.writer.id,
        email: message.writer.email,
        name: message.writer.name,
        photo: message.writer.photo
      },
      delivered: [
        message.delivered.map(item => (
          {
            id: item.intendedParticipant.participant.id,
            email: item.intendedParticipant.participant.email,
            name: item.intendedParticipant.participant.name,
          }
        ))
      ].flat(Infinity),
      seen: [
        message.seen.map(item => (
          {
            id: item.intendedParticipant.participant.id,
            email: item.intendedParticipant.participant.email,
            name: item.intendedParticipant.participant.name,
          }
        ))
      ].flat(Infinity),
      isDelivered: JSON.stringify(message.delivered.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
      isSeen: JSON.stringify(message.seen.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
    }
  }

  async getRoomMembers(roomId: number) {
    const room = await this.roomsRepo.findOne({ where: { id: roomId }, relations: { intendedParticipants: { participant: true } } })
    const members =
      room.intendedParticipants.filter(participant => participant.status === chatIntendedParticipantStatus.accepted).map(item => item.participant)
    return members
  }

  async addMessageDelivering(user: User, msg: ChatMessage, roomsWithOnlineUsers: { [key: number]: User[] }) {
    try {
      const roomsWithIntendedParticipants = {}
      const deliveredMessagesSaves = {}
      const roomId = msg.room.id

      const thisRoomOnlineUsers = roomsWithOnlineUsers[roomId] || []
      const thisRoomWithIntendedParticipants = (await Promise.all(
        thisRoomOnlineUsers.map(
          (usr: User) =>
            this.intendedParticipantsRepo.findOne({
              where: [
                {
                  room: { id: Number(roomId) },
                  participant: { id: usr.id },
                  status: chatIntendedParticipantStatus.accepted
                },
                {
                  room: { id: Number(roomId) },
                  creator: { id: usr.id },
                  status: chatIntendedParticipantStatus.accepted
                },
              ]
            })
        )
      )) || []

      for (const item of thisRoomWithIntendedParticipants) {
        const found = await this.deliveredMessagesRepo.findOne({
          relations: { message: true, intendedParticipant: true },
          where: { intendedParticipant: { id: item.id }, message: { id: msg.id } }
        })
        if (!found) {
          const newRec = this.deliveredMessagesRepo.create({
            intendedParticipant: item,
            message: msg
          })
          const newRecSave = await this.deliveredMessagesRepo.save(newRec)
          deliveredMessagesSaves[roomId] = deliveredMessagesSaves[roomId] || []
          deliveredMessagesSaves[roomId].push(newRecSave)
        }
      }

      return deliveredMessagesSaves
    }
    catch (ex) {
      console.log(ex)
    }

  }

  async addMessageSeen(user: User, messageId: number, roomId: number) {
    try {
      const msg = await this.messagesRepo.findOne({ where: { id: messageId } })
      const intendedParticipant = await this.intendedParticipantsRepo.findOne({
        where: [
          {
            room: { id: Number(roomId) },
            participant: { id: user.id },
            status: chatIntendedParticipantStatus.accepted
          },
          {
            room: { id: Number(roomId) },
            creator: { id: user.id },
            status: chatIntendedParticipantStatus.accepted
          },
        ]
      })
      const save = await this.seenMessagesRepo.upsert({ intendedParticipant: intendedParticipant, message: msg }, { conflictPaths: ['id'], skipUpdateIfNoValuesChanged: true })

      console.log(user.id, 'seen')

      return save
    }
    catch (ex) {
      console.log(ex)
    }
  }

  async addDeliveredToMyAllMessages(user: User) {
    try {
      const myRooms = await this.roomsRepo.find({
        relations: {
          intendedParticipants: { participant: true },
          messages: { room: { intendedParticipants: { participant: true } } }
        },
        where: {
          intendedParticipants: { participant: { id: In([user.id]) } }
        }
      })

      const allMessages = (myRooms.map(room => room.messages).flat(Infinity) as unknown as ChatMessage[])
        .reduce((p, c) => ({ ...p, [c.id.toString()]: c }), {})

      const allMessagesIds = myRooms.map(room => room.messages.map(msg => msg.id)).flat(Infinity)

      const deliveryStatus = await this.deliveredMessagesRepo.find({
        relations: { intendedParticipant: { participant: true }, message: true },
        where: { message: { id: In(allMessagesIds) }, intendedParticipant: { participant: { id: user.id } } }
      })

      const toAddDeliveryMessages: ChatMessage[] = (allMessagesIds
        .filter(item => !deliveryStatus.map(elem => elem.message.id).includes(Number(item)))
      ).map(x => allMessages[x.toString()])

      const newRecs = this.deliveredMessagesRepo.create(
        toAddDeliveryMessages
          .map(msg => ({
            message: msg,
            intendedParticipant: msg.room.intendedParticipants.find(x => x.participant.id === user.id)
          })))

      const addingMissedDelivery = await this.deliveredMessagesRepo.save(newRecs)

      const updatedMessages = await this.messagesRepo.find({
        relations: {
          room: { intendedParticipants: { participant: true } },
          delivered: { intendedParticipant: { participant: true } },
          seen: { intendedParticipant: { participant: true } },
          writer: true
        },
        where: { id: In(toAddDeliveryMessages.map(item => item.id)) }
      })

      // const addingMissedDelivery = await this.deliveredMessagesRepo.insert(toAddDeliveryMessages.map(msg => ({ message: msg, intendedParticipant: msg.room.intendedParticipants.find(x => x.participant.id === user.id) })))

      return updatedMessages.map(item => {

        const members = [
          item.room.intendedParticipants.filter(participant => participant.status === chatIntendedParticipantStatus.accepted).map(item => item.participant.id),
        ].flat(Infinity).sort()

        return ({
          ...item,
          writer: {
            id: item.writer.id,
            email: item.writer.email,
            name: item.writer.name,
            photo: item.writer.photo
          },
          delivered: [
            item.delivered.map(item => (
              {
                id: item.intendedParticipant.participant.id,
                email: item.intendedParticipant.participant.email,
                name: item.intendedParticipant.participant.name,
              }
            ))
          ].flat(Infinity),
          seen: [
            item.seen.map(item => (
              {
                id: item.intendedParticipant.participant.id,
                email: item.intendedParticipant.participant.email,
                name: item.intendedParticipant.participant.name,
              }
            ))
          ].flat(Infinity),
          isDelivered: JSON.stringify(item.delivered.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
          isSeen: JSON.stringify(item.seen.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
        })
      })
    }
    catch (ex) {
      console.log(ex)
    }
  }

  async addSeenToThisRoomAllMessages(user: User, roomId: number) {
    try {
      const thisRoom = await this.roomsRepo.findOne({
        relations: {
          intendedParticipants: { participant: true },
          messages: { room: { intendedParticipants: { participant: true } } }
        },
        where: { id: roomId }
      })

      const thisRoomAllMessages = (thisRoom.messages as ChatMessage[])
        .reduce((p, c) => ({ ...p, [c.id.toString()]: c }), {})

      const thisRoomAllMessagesIds = thisRoom.messages.map(msg => msg.id)

      const seenStatus = await this.seenMessagesRepo.find({
        relations: { intendedParticipant: { participant: true }, message: true },
        where: { message: { id: In(thisRoomAllMessagesIds) }, intendedParticipant: { participant: { id: user.id } } }
      })

      const toAddSeenMessages: ChatMessage[] = (thisRoomAllMessagesIds
        .filter(item => !seenStatus.map(elem => elem.message.id).includes(Number(item)))
      ).map(x => thisRoomAllMessages[x.toString()])

      const newRecs = this.seenMessagesRepo.create(
        toAddSeenMessages
          .map(msg => ({
            message: msg,
            intendedParticipant: msg.room.intendedParticipants.find(x => x.participant.id === user.id)
          })))

      const addingMissedSeen = await this.seenMessagesRepo.save(newRecs)

      const updatedMessages = await this.messagesRepo.find({
        relations: {
          room: { intendedParticipants: { participant: true } },
          delivered: { intendedParticipant: { participant: true } },
          seen: { intendedParticipant: { participant: true } },
          writer: true
        },
        where: { id: In(toAddSeenMessages.map(item => item.id)) }
      })

      // const addingMissedDelivery = await this.deliveredMessagesRepo.insert(toAddDeliveryMessages.map(msg => ({ message: msg, intendedParticipant: msg.room.intendedParticipants.find(x => x.participant.id === user.id) })))

      return updatedMessages.map(item => {

        const members = [
          item.room.intendedParticipants.filter(participant => participant.status === chatIntendedParticipantStatus.accepted).map(item => item.participant.id),
        ].flat(Infinity).sort()

        return ({
          ...item,
          writer: {
            id: item.writer.id,
            email: item.writer.email,
            name: item.writer.name,
            photo: item.writer.photo
          },
          delivered: [
            item.delivered.map(item => (
              {
                id: item.intendedParticipant.participant.id,
                email: item.intendedParticipant.participant.email,
                name: item.intendedParticipant.participant.name,
              }
            ))
          ].flat(Infinity),
          seen: [
            item.seen.map(item => (
              {
                id: item.intendedParticipant.participant.id,
                email: item.intendedParticipant.participant.email,
                name: item.intendedParticipant.participant.name,
              }
            ))
          ].flat(Infinity),
          isDelivered: JSON.stringify(item.delivered.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
          isSeen: JSON.stringify(item.seen.map(item => item.intendedParticipant.participant.id).sort()) === JSON.stringify(members),
        })
      })
    }
    catch (ex) {
      console.log(ex)
    }
  }

  whereRU(): string {
    return 'hello, you are in service of chat app.';
  }
}

