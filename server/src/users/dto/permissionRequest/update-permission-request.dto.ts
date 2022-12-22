import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { CreatePermissionRequestDto } from './create-permission-request.dto';

export class UpdatePermissionRequestDto extends PartialType(
  CreatePermissionRequestDto,
) {
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'desc' })
  adminMsg?: string;

  @Expose()
  @ApiProperty()
  result: string;
}
