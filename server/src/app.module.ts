import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaServerModule } from './NMS/nms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './apps/CHAT/chat.module';
import { CrudModule } from './apps/CRUD/crud.module';
import { FilesModule } from './apps/FILE/files.module';
import { MoviesModule } from './apps/Movie/movies.module';
import { MusicsModule } from './apps/Music/musics.module';
import { AuthModule } from './authentication/auth.module';
import { AppDataSource } from './data-source';
import { AllExceptionFilter } from './exceptions/all-exceptions.filter';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

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
  ],
})
export class AppModule {}
