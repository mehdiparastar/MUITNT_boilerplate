import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRoles } from 'src/enum/userRoles.enum';

export class CreatePermissionRequestDto {
  @IsEnum(UserRoles)
  @ApiProperty({ default: UserRoles.admin, enum: UserRoles })
  role: UserRoles;
}
