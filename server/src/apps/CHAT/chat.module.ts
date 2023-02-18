import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { AccessTokenStrategy } from 'src/authentication/strategies/accessToken.strategy';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatIntendedParticipants } from './entities/intendedParticipants.entity';
import { ChatMessage } from './entities/messages.entity';
import { ChatRoom } from './entities/room.entity';
import { SocketIOAdapter } from './socket-io-adapter';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, ChatMessage, ChatIntendedParticipants]), AuthModule],
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatService,
  ],
})
export class ChatModule {

}
