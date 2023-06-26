import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicFileInfo } from './entities/musicFileInfo.entity';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { MusicGateway } from './music.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MusicFileInfo])],
  controllers: [MusicsController],
  providers: [MusicsService, MusicGateway],
})
export class MusicsModule {}
