import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Reaction } from './entities/reaction.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ReactionsService } from './reactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Reaction])],
  controllers: [PostsController],
  providers: [PostsService, ReactionsService],
})
export class PostsModule {}
