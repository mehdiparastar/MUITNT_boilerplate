import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { WEBRTCCallRoom } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { WEBRTCCallInfo } from './entities/callInfo.entity';
import { CreateCallInfoDto } from './dto/callInfo/create-callInfo.dto';
import { CallInfoState } from 'src/enum/webrtcCallEvent.enum';
import { UpdateCallInfoDto } from './dto/callInfo/update-callInfo.dto';

@Injectable()
export class WEBRTCCallService {
  constructor(
    @InjectRepository(WEBRTCCallRoom)
    private roomsRepo: Repository<WEBRTCCallRoom>,
    @InjectRepository(WEBRTCCallInfo)
    private callInfosRepo: Repository<WEBRTCCallInfo>,
  ) { }

  async findMyAllRooms(user: User) {
    try {
      const rooms = await this.roomsRepo.find({
        relations: {
          creator: true,
        },
        order: { createdAt: 'DESC' },
      });

      return rooms;
    } catch (ex) {
      console.log(ex);
    }
  }

  async getMyConferenceLink(user: User) {
    try {
      const [find] = await this.roomsRepo.find({
        where: { creator: { id: user.id } },
      });
      if (find && find.link) {
        return { link: find.link };
      } else {
        const link = uuidv4();
        const newRoom = this.roomsRepo.create({
          link: link,
          creator: user,
        });

        const save = await this.roomsRepo.save(newRoom);
        return { link: save.link };
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async findRoomByLink(link: string) {
    const find = await this.roomsRepo.findOne({ where: { link: link }, relations: { creator: true } })
    return find
  }

  async addNewCallInfo(info: CreateCallInfoDto) {
    const newEntry = this.callInfosRepo.create({
      room: info.room,
      state: CallInfoState.Calling,
      creator: info.creator,
    })
    const save = await this.callInfosRepo.save(newEntry)
    return save
  }

  async updateCallInfo(id: number, attrs: UpdateCallInfoDto) {
    const find = await this.findCallInfoById(id);
    if (!find) {
      throw new NotFoundException('call info not found');
    }
    Object.assign(find, attrs);
    const save = await this.callInfosRepo.save(find);
    return save;
  }

  async findCallInfoById(id: number) {
    const find = await this.callInfosRepo.findOne({ where: { id: id }, relations: { room: true, creator: true } })
    return find
  }

  async findLastValidCallInfoByEmailAndRoomLink(email: string, roomLink: string) {
    const find = await this.callInfosRepo.findOne(
      {
        where: {
          creator: { email: email },
          room: { link: roomLink },
          state: CallInfoState.Calling
        },
        order: { 'updatedAt': 'DESC' },
        relations: {
          room: true,
          creator: true
        }
      })
    return find
  }

  whereRU(): string {
    return 'hello, you are in service of webrtcCall app.';
  }
}
