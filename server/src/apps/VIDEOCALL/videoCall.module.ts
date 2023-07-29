import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { VideoCallRoom } from './entities/room.entity';
import { VideoCallController } from './videoCall.controller';
import { VideoCallGateway } from './videoCall.gateway';
import { VideoCallService } from './videoCall.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoCallRoom]),
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
  controllers: [VideoCallController],
  providers: [VideoCallGateway, VideoCallService],
})
export class VideoCallModule {}
