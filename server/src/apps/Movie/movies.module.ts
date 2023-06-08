import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieFileInfo } from './entities/movieFileInfo.entity';
import { MediaServerService } from './media-server.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieFileInfo])],
  controllers: [MoviesController],
  providers: [MoviesService, MediaServerService],
})
export class MoviesModule {}
