import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ChatIntendedParticipants } from './intendedParticipants.entity';
import { ChatMessage } from './messages.entity';

@Entity()
@Index(['title', 'creator'], { unique: true })
export class ChatRoom {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index({ unique: false })
  @ApiProperty({ default: 'room title' })
  title: string;

  @Column({ type: 'longtext', nullable: true })
  @ApiProperty()
  caption: string;

  @Column({ type: 'longtext', nullable: true })
  @ApiProperty()
  photo: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  closed: boolean

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.createdRooms, { nullable: false })
  creator: User;

  @ManyToMany(() => User, (user) => user.participantsRoom, { cascade: true })
  @JoinTable()
  participants: User[];

  @ManyToMany(() => User, (user) => user.adminsRoom, { cascade: true })
  @JoinTable()
  admins: User[];

  @OneToMany(() => ChatMessage, (msg) => msg.room, { cascade: true })
  messages: ChatMessage[];

  @OneToMany(() => ChatIntendedParticipants, (msg) => msg.room, { cascade: true })
  intendedParticipants: ChatIntendedParticipants[];
}
