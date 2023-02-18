import { ApiProperty } from '@nestjs/swagger';
import { chatMessageStatus } from 'src/enum/chatMessageStatus.enum';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ChatRoom } from './room.entity';

@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ type: 'longtext', nullable: true })
    @ApiProperty()
    message: string;

    @Column({ type: 'enum', enum: chatMessageStatus, nullable: false, default: chatMessageStatus.sent })
    @ApiProperty({ default: chatMessageStatus.sent, enum: chatMessageStatus })
    status: chatMessageStatus;

    @CreateDateColumn()
    @ApiProperty()
    createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt?: Date;

    @ManyToOne(() => ChatRoom, (room) => room.messages, { nullable: false })
    room: ChatRoom;

    @ManyToOne(() => User, (user) => user.chatMessages, { nullable: false })
    writer: User;


}
