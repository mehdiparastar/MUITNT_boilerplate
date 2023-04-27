import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionRequest } from './entities/permission-requests.entity';
import { User } from './entities/user.entity';
import { PermissionRequestsService } from './permissionRequests.service';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPermissionRequest])],
  providers: [UsersService, PermissionRequestsService],
  exports: [UsersService, PermissionRequestsService],
})
export class UsersModule {}
