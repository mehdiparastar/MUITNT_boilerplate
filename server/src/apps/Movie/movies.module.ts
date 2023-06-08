import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieFileInfo } from './entities/movieFileInfo.entity';
import { MediaServerService } from './media-server.service';
import { MovieGateway } from './movie.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MovieFileInfo])],
  controllers: [MoviesController],
  providers: [MoviesService, MediaServerService, MovieGateway],
})
export class MoviesModule {}
