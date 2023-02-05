import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FileBuffer } from './fileBuffer.entity';

@Entity()
export class FileInfo {
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

  @OneToOne(() => FileBuffer, (fileBuffer) => fileBuffer.fileInfo, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  @ApiProperty()
  fileBuffer: FileBuffer

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