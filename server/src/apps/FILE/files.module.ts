import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileBuffer } from './entities/fileBuffer.entity';
import { FileInfo } from './entities/fileInfo.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileInfo, FileBuffer]),
    // MulterModule.register({ dest: './src/apps/FILE/uploads' }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
