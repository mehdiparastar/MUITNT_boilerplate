import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Tag } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    UsersModule
  ],
  controllers: [TagsController],
  providers: [
    TagsService,
  ],
})
export class TagsModule { }
