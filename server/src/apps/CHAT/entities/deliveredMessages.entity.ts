import { ApiProperty } from '@nestjs/swagger';
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatIntendedParticipants } from './intendedParticipants.entity';
import { ChatMessage } from './messages.entity';

@Entity()
@Index(['message', 'intendedParticipant'], { unique: true })
export class ChatDeliveredMessages {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => ChatMessage, (message) => message.delivered, {
    nullable: false,
  })
  message: ChatMessage;

  @ManyToOne(
    () => ChatIntendedParticipants,
    (intendedParticipant) => intendedParticipant.delivered,
    { nullable: false },
  )
  intendedParticipant: ChatIntendedParticipants;
}
