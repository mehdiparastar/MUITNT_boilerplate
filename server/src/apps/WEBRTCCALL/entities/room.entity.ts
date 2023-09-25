import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WEBRTCCallInfo } from './callInfo.entity';

@Entity()
@Index(['link', 'creator'], { unique: true })
export class WEBRTCCallRoom {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index({ unique: false })
  @ApiProperty({ default: 'room link' })
  link: string;

  @OneToMany(
    () => WEBRTCCallInfo,
    (callInfo) => callInfo.room,
    { cascade: true },
  )
  callInfos: WEBRTCCallInfo[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.createdRooms, { nullable: false })
  creator: User;
}
