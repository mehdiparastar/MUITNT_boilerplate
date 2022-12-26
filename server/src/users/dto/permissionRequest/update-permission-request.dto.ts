import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { permissionRequestResultEnum } from 'src/enum/permissionRequestResult.enum';
import { User } from 'src/users/entities/user.entity';

import { CreatePermissionRequestDto } from './create-permission-request.dto';

export class UpdatePermissionRequestDto extends PartialType(
  CreatePermissionRequestDto,
) {
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'desc' })
  adminMsg?: string;

  @IsEnum(permissionRequestResultEnum)
  @IsString()
  result: string;

  @IsOptional()
  approver?: User;
}
