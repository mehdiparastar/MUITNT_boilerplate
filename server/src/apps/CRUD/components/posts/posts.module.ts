import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudPost } from './entities/post.entity';
import { CrudReaction } from './entities/reaction.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ReactionsService } from './reactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([CrudPost, CrudReaction])],
  controllers: [PostsController],
  providers: [PostsService, ReactionsService],
})
export class PostsModule {}
