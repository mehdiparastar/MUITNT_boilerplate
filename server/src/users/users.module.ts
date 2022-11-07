import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Roles } from './entities/roles.entity';
import { UserRolesService } from './user-roles.service';
// import { AuthService } from './auth.service';
import { AuthService } from '../auth/auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthService),
    // AuthService,
    TypeOrmModule.forFeature([User, Roles]),
    // JwtModule.register({
    //   secret: 'secret',
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
     UserRolesService],
  exports: [UsersService],
})
export class UsersModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CurrentUserMiddleware).forRoutes('*');
//   }
// }
