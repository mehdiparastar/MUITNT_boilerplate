import { ApiProperty } from '@nestjs/swagger';
import { CallInfoState } from 'src/enum/webrtcCallEvent.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WEBRTCCallRoom } from './room.entity';

@Entity()
export class WEBRTCCallInfo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => WEBRTCCallRoom, (room) => room.callInfos, { nullable: false })
  room: WEBRTCCallRoom;

  @Column({ type: 'enum', enum: CallInfoState, nullable: false, default: CallInfoState.Calling })
  @ApiProperty()
  state: CallInfoState;

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.createdRooms, { nullable: false })
  creator: User;
}
