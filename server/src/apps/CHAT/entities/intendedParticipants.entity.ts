import { ApiProperty } from '@nestjs/swagger';
import { chatIntendedParticipantStatus } from 'src/enum/chatIntendedParticipantStatus.enum';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ChatDeliveredMessages } from './deliveredMessages.entity';
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

    @ManyToOne(() => ChatRoom, (room) => room.intendedParticipants, { nullable: false })
    room: ChatRoom;

    @ManyToOne(() => User, (user) => user.creatorOfIntendedParticipants, { nullable: false })
    creator: User;

    @ManyToOne(() => User, (user) => user.participantOfIntendedParticipants, { nullable: false })
    participant: User;

    @OneToMany(() => ChatDeliveredMessages, (delieveredMessage) => delieveredMessage.intendedParticipant, { cascade: true })
    delivered: ChatDeliveredMessages[];
}