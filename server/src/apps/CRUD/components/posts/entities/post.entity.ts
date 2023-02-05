import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reaction } from './reaction.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index({ unique: false })
  @ApiProperty({ default: 'post title' })
  title: string;

  @Column({ type: 'longtext', nullable: true })
  @ApiProperty()
  caption: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  author: User;

  @OneToMany(() => Reaction, (reaction) => reaction.post, { cascade: true })
  reactions: Reaction[];
}
