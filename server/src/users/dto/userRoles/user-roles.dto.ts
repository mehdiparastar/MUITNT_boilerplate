import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRoles } from '../../../enum/userRoles.enum';

export class UserRolesDto {
  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.superUser]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.admin]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.adminSection1]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.adminSection2]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.adminSection3]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.section1ExpertL1]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.section1ExpertL2]?: boolean;
  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.section2ExpertL1]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.section2ExpertL2]?: boolean;

  @Expose()
  @ApiProperty({ default: false })
  [UserRoles.section3ExpertL1]?: boolean;

  @Expose()
  @ApiProperty({ default: true })
  [UserRoles.section3ExpertL2]?: boolean;
}
