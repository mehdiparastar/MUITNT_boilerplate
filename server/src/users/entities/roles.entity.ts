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
  [UserRoles.adminSection1]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.adminSection2]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.adminSection3]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.section1ExpertL1]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.section1ExpertL2]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.section2ExpertL1]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.section2ExpertL2]?: boolean;

  @Column({ type: 'boolean', default: false })
  [UserRoles.section3ExpertL1]?: boolean;

  @Column({ type: 'boolean', default: true })
  [UserRoles.section3ExpertL2]?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
