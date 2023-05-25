import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieFileInfo } from './movieFileInfo.entity';

@Entity()
export class MovieFileBuffer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  @Column({ nullable: false })
  segmentNo: number;

  @Column({ type: 'longblob' })
  @ApiProperty()
  file: Buffer;

  @ManyToMany(() => MovieFileInfo, (file) => file.fileBuffers, {
    nullable: true,
  })
  filesInfo: MovieFileInfo[];

  @Column()
  @Index({ unique: false })
  @ApiProperty()
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
