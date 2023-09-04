import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { RTMPCallRoom } from './entities/room.entity';
import { RTMPCallController } from './rtmpCall.controller';
import { RTMPCallGateway } from './rtmpCall.gateway';
import { RTMPCallService } from './rtmpCall.service';
import { MediaServerService } from 'src/NMS/nms.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RTMPCallRoom]),
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
  controllers: [RTMPCallController],
  providers: [RTMPCallGateway, RTMPCallService],
})
export class RTMPCallModule { }
