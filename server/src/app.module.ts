import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './apps/CHAT/chat.module';
import { CrudModule } from './apps/CRUD/crud.module';
import { FilesModule } from './apps/FILE/files.module';
import { AuthModule } from './authentication/auth.module';
import { AppDataSource } from './data-source';
import { AllExceptionFilter } from './exceptions/all-exceptions.filter';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './apps/Movie/movies.module';
import { MediaServerModule } from './NMS/nms.module';
const NodeMediaServer = require('node-media-server');
import * as path from 'path';
import { MusicsModule } from './apps/Music/musics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    AuthModule,
    CrudModule,
    FilesModule,
    TagsModule,
    ChatModule,
    MoviesModule,
    MusicsModule,
    MediaServerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    AppService,
    {
      provide: NodeMediaServer,
      useValue: new NodeMediaServer({
        auth: {
          api: true,
          api_user: 'username', // Username for API authentication
          api_pass: 'password', // Password for API authentication
          play: false, // Disable unauthenticated play access
          publish: true, // Enable authenticated publish access
          secret: 'mehdi',
        },
        rtmp: {
          port: 1935,
          chunk_size: 60000,
          gop_cache: true,
          ping: 60,
          ping_timeout: 30,
        },
        http: {
          api: true,
          port: 8000, // HTTP port for HLS
          mediaroot: path.join(process.cwd(), '..', 'uploads'), // Directory where your media files are stored
          allow_origin: '*', // Allow access from any domain,
        },
        trans: {
          ffmpeg: '/usr/bin/ffmpeg',
          tasks: [
            {
              app: 'live',
              hls: true,
              hlsFlags:
                '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
              dash: true,
              dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
            },
          ],
        },
      }),
    },
  ],
})
export class AppModule {}
