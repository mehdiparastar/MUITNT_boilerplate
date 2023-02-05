import { ApiProperty } from '@nestjs/swagger';
import { appNameEnum } from 'src/enum/appName.enum';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToMany,
    ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { FileInfo } from 'src/apps/FILE/entities/fileInfo.entity';

@Entity()
@Index(['tag', 'appName'], { unique: true })
export class Tag {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @Index({ unique: false })
    @ApiProperty({ default: 'tag title' })
    tag: string;

    @Column({ type: 'enum', enum: appNameEnum, nullable: true })
    @ApiProperty({ enum: appNameEnum })
    appName: string;

    @CreateDateColumn()
    @ApiProperty()
    createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt?: Date;

    @ManyToOne(() => User, (user) => user.createdTags, { nullable: false })
    creator: User;

    @ManyToMany(() => FileInfo, (file) => file.tags, { nullable: true })
    files: FileInfo;
}
