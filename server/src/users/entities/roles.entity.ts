import { UserRoles } from '../../enum/userRoles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  [UserRoles.superUser]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.admin]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.expert_l1]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.expert_l2]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.user_l1]?: boolean;

  @Column({ type: 'boolean', default: true })
  [UserRoles.user_l2]?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
