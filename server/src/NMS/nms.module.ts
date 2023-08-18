import { Module } from '@nestjs/common';
import { MediaServerService } from './nms.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [MediaServerService],
})
export class MediaServerModule { }
