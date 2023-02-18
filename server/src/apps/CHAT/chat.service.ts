import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/user/user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/room/create-room.dto';
import { UpdateRoomDto } from './dto/room/update-room.dto';
import { ChatIntendedParticipants } from './entities/intendedParticipants.entity';
import { ChatMessage } from './entities/messages.entity';
import { ChatRoom } from './entities/room.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private roomsRepo: Repository<ChatRoom>,
    @InjectRepository(ChatMessage)
    private messagesRepo: Repository<ChatMessage>,
    @InjectRepository(ChatIntendedParticipants)
    private intendedParticipantsRepo: Repository<ChatIntendedParticipants>,
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

    return await Promise.all(newIntendedParticipants.map(item => this.intendedParticipantsRepo.save(item)))
  }

  async findMyAllRooms(user: User) {
    const qryRes = await this.roomsRepo.find({
      relations: {
        creator: true,
        participants: true,
        intendedParticipants: true,
        admins: true,
      },
      where: [
        { closed: false, creator: { id: user.id } },
        { closed: false, participants: { id: user.id } }
      ],
      order: { createdAt: 'DESC' },
    });

    return qryRes
  }

  async findMyAllRequests(user: User) {
    const qryRes = await this.intendedParticipantsRepo.find({
      relations: {
        creator: true,
        participant: true,
        room: true
      },
      where: [
        { participant: { id: user.id } }
      ],
      order: { createdAt: 'DESC' },
    });

    return qryRes
  }

  async findAll(
    skip: number = 0,
    limit: number = 3,
  ): Promise<{ data: ChatRoom[]; count: number }> {
    // Create new Post
    const [result, total] = await this.roomsRepo.findAndCount({
      relations: {
        creator: true,
        participants: true,
        admins: true,
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

  async findOneById(id: number): Promise<ChatRoom> {
    if (!id) {
      throw new NotFoundException('room not found');
    }
    const find = await this.roomsRepo.findOne({
      relations: {
        creator: true,
        participants: true,
        admins: true,
        messages: true
      },
      where: { id, closed: false },
    });
    if (!find) {
      throw new NotFoundException('room not found');
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
        participants: true,
        admins: true,
        messages: true
      },
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('room not found');
    }
    return find;
  }

  async softRemoveRoom(user: User, id: number): Promise<ChatRoom> {
    const room = await this.findOneById(id);
    if (!room) {
      throw new NotFoundException('room not found');
    }
    if (!room.participants.map(item => item.id).includes(user.id)) {
      throw new NotAcceptableException(
        'You could only leave rooms that you have participated in it!',
      );
    }
    return this.roomsRepo.remove(room);
  }

  async hardRemoveRoom(user: User, id: number): Promise<ChatRoom> {
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
    const room = await this.findOneById(id);
    if (!room) {
      throw new NotFoundException('room not found');
    }
    if (!room.admins.map(item => item.id).includes(user.id)) {
      throw new NotAcceptableException(
        'You only could update rooms that you are as administrator!',
      );
    }
    Object.assign(room, attrs);
    return this.roomsRepo.save(room);
  }

  whereRU(): string {
    return 'hello, you are in service of chat app.';
  }
}
