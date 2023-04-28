import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieFileInfo } from './entities/movieFileInfo.entity';
import { MovieFileBuffer } from './entities/movieFileBuffer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieFileInfo, MovieFileBuffer])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
