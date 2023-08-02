import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { VideoCallRoom } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VideoCallService {
  constructor(
    @InjectRepository(VideoCallRoom)
    private roomsRepo: Repository<VideoCallRoom>,
  ) {}

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

  whereRU(): string {
    return 'hello, you are in service of videoCall app.';
  }
}
