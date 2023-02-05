import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileInfo } from './fileInfo.entity';

@Entity()
export class FileBuffer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'longblob' })
  @ApiProperty()
  file: Buffer;

  @OneToOne(() => FileInfo, (file) => file.fileBuffer, {
    nullable: false,
    onDelete: 'CASCADE',
  }) // specify inverse side as a second parameter
  fileInfo: FileInfo;

  @Column()
  @ApiProperty()
  @Index({ unique: true })
  fileHash: string;

  @CreateDateColumn()
  @IsOptional()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @IsOptional()
  @ApiProperty()
  updatedAt?: Date;
}
