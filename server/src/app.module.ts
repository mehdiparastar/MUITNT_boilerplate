import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './exceptions/all-exceptions.filter';
import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
// import cookieSession from 'cookie-session';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    AuthModule,
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService<IconfigService>) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
// implements NestModule {
//   constructor(private configService: ConfigService<IconfigService>) {}
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(
//         cookieSession({
//           keys: [this.configService.get<string>('COOKIE_KEY')],
//         }),
//       )
//       .forRoutes('*');
//   }
// }
