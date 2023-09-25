import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { WEBRTCCallInfo } from './entities/callInfo.entity';
import { WEBRTCCallRoom } from './entities/room.entity';
import { WEBRTCCallController } from './webrtcCall.controller';
import { WEBRTCCallGateway } from './webrtcCall.gateway';
import { WEBRTCCallService } from './webrtcCall.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WEBRTCCallRoom, WEBRTCCallInfo]),
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
  controllers: [WEBRTCCallController],
  providers: [WEBRTCCallGateway, WEBRTCCallService],
})
export class WEBRTCCallModule { }
