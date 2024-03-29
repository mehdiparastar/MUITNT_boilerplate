import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ChatIntendedParticipants } from 'src/apps/CHAT/entities/intendedParticipants.entity';
import { ChatMessage } from 'src/apps/CHAT/entities/messages.entity';
import { ChatRoom } from 'src/apps/CHAT/entities/room.entity';
import { CrudPost } from 'src/apps/CRUD/components/posts/entities/post.entity';
import { CrudReaction } from 'src/apps/CRUD/components/posts/entities/reaction.entity';
import { FileTag } from 'src/tags/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileInfo } from '../../apps/FILE/entities/fileInfo.entity';
import { authTypeEnum } from '../../enum/authType.enum';
import { UserPermissionRequest } from './permission-requests.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index({ unique: true })
  @ApiProperty({ default: 'test@test.com' })
  email: string;

  @Column({ nullable: true })
  @ApiHideProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  refreshToken: string;

  @Column({ nullable: true })
  @ApiProperty()
  streamToken: string;

  @Column({ type: 'enum', enum: authTypeEnum, default: authTypeEnum.local })
  @ApiProperty()
  provider: string;

  @Column({ nullable: true })
  @ApiProperty()
  @Index({ unique: true })
  providerId: string;

  @Column({ nullable: true })
  @ApiProperty()
  name: string;

  @Column({ type: 'longtext', nullable: true })
  @ApiProperty()
  photo: string;

  @Column('simple-array', { nullable: true })
  @ApiProperty()
  roles: string[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;

  @OneToMany(
    () => UserPermissionRequest,
    (permissionRequest) => permissionRequest.user,
    { cascade: true },
  )
  permissionRequests: UserPermissionRequest[];

  @OneToMany(
    () => UserPermissionRequest,
    (permissionRequest) => permissionRequest.user,
    { cascade: true },
  )
  approves: UserPermissionRequest[];

  @OneToMany(() => CrudPost, (post) => post.author, { cascade: true })
  posts: CrudPost[];

  @OneToMany(() => CrudReaction, (reaction) => reaction.creator, {
    cascade: true,
  })
  reactions: CrudReaction[];

  @OneToMany(() => FileInfo, (file) => file.owner, { cascade: true })
  files: FileInfo[];

  @OneToMany(() => FileTag, (tag) => tag.creator, { cascade: true })
  createdTags: FileTag[];

  @OneToMany(() => ChatRoom, (room) => room.creator, { cascade: true })
  createdRooms: ChatRoom[];

  @OneToMany(() => ChatMessage, (msg) => msg.writer, { cascade: true })
  chatMessages: ChatMessage[];

  @OneToMany(
    () => ChatIntendedParticipants,
    (intendedParticipant) => intendedParticipant.creator,
    { cascade: true },
  )
  creatorOfIntendedParticipants: ChatIntendedParticipants[];

  @OneToMany(
    () => ChatIntendedParticipants,
    (intendedParticipant) => intendedParticipant.participant,
    { cascade: true },
  )
  participantOfIntendedParticipants: ChatIntendedParticipants[];
}
