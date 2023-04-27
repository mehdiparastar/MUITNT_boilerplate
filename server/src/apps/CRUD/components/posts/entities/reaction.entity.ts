import { ApiProperty } from '@nestjs/swagger';
import { reactionTypeEnum } from 'src/enum/reactionType.enum';
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
import { CrudPost } from './post.entity';

@Entity()
@Index(['type', 'creator', 'post'], { unique: true })
export class CrudReaction {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ default: reactionTypeEnum.like, enum: reactionTypeEnum })
  type: reactionTypeEnum;

  @ManyToOne(() => CrudPost, (post) => post.reactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: CrudPost;

  @ManyToOne(() => User, (user) => user.reactions, { nullable: false })
  creator: User;

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;
}
