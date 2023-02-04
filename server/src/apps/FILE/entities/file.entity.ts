import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index({ unique: false })
  @ApiProperty({ default: 'file name' })
  name: string;

  @IsOptional()
  @ManyToMany(() => Tag, (tag) => tag.files, { cascade: true })
  @JoinTable()
  tags?: Tag[];

  @Column()
  @ApiProperty({ default: 'file type' })
  type: string;

  @Column({ type: 'bigint', comment: 'size in byte' })
  @ApiProperty({ default: 'file size' })
  size: number;

  @Column({ type: 'boolean', default: true, comment: 'size in byte' })
  @ApiProperty({ default: true })
  private: boolean;

  @Column({ type: 'longblob' })
  @ApiProperty()
  file: Buffer

  @Column()
  @ApiProperty()
  @Index({ unique: true })
  fileHash: string

  @CreateDateColumn()
  @IsOptional()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @IsOptional()
  @ApiProperty()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.files, { nullable: false })
  @IsOptional()
  owner: User;
}