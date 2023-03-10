import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { chatMessageStatus } from 'src/enum/chatMessageStatus.enum';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
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

    @IsOptional()
    @ManyToMany(() => User, (user) => user.deliveredMessages, { cascade: true })
    @JoinTable()
    status_delivered_users?: User[];

    @IsOptional()
    @ManyToMany(() => User, (user) => user.seenMessages, { cascade: true })
    @JoinTable()
    status_seen_users?: User[];

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
