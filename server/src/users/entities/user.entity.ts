import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../enum/userRoles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index({ unique: true })
  @ApiProperty({ default: 'test@test.com' })
  email: string;

  @Column()
  @ApiHideProperty()
  password: string;

  @OneToOne(() => Roles)
  @JoinColumn()
  @ApiProperty({ isArray: true, enum: UserRoles })
  roles: Roles;

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;
}
