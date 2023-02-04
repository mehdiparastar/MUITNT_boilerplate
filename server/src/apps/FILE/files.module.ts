import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    // MulterModule.register({ dest: './src/apps/FILE/uploads' }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { }
