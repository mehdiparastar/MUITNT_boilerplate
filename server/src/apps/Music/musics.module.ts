import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicFileInfo } from './entities/musicFileInfo.entity';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';

@Module({
  imports: [TypeOrmModule.forFeature([MusicFileInfo])],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
