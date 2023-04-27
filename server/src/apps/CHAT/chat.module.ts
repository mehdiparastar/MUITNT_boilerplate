import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatDeliveredMessages } from './entities/deliveredMessages.entity';
import { ChatIntendedParticipants } from './entities/intendedParticipants.entity';
import { ChatMessage } from './entities/messages.entity';
import { ChatRoom } from './entities/room.entity';
import { ChatSeenMessages } from './entities/seenMessages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatRoom,
      ChatMessage,
      ChatIntendedParticipants,
      ChatDeliveredMessages,
      ChatSeenMessages,
    ]),
    AuthModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService<IconfigService>) => {
        return {
          secret: config.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>(
              'JWT_ACCESS_EXPIRATION_TIME',
            ),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
