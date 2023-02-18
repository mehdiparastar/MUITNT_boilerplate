import { ApiProperty } from '@nestjs/swagger';
import { chatIntendedParticipantStatus } from 'src/enum/chatIntendedParticipantStatus.enum';
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
import { ChatMessage } from './messages.entity';
import { ChatRoom } from './room.entity';

@Entity()
export class ChatIntendedParticipants {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ type: 'enum', enum: chatIntendedParticipantStatus, default: chatIntendedParticipantStatus.requested })
    @ApiProperty({ enum: chatIntendedParticipantStatus })
    status: chatIntendedParticipantStatus

    @Column({ type: 'bool', default: false })
    @ApiProperty()
    isAdmin: boolean

    @CreateDateColumn()
    @ApiProperty()
    createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt?: Date;

    @ManyToOne(() => ChatRoom, (room) => room.intendedParticipants)
    room: ChatRoom;

    @ManyToOne(() => User, (user) => user.creatorOfIntendedParticipants, { nullable: false })
    creator: User;

    @ManyToOne(() => User, (user) => user.participantOfIntendedParticipants, { nullable: false })
    participant: User;

}
