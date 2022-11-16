import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateLocalUserDto } from './create-local-user.dto';

// export class ChangeLocalUserPasswordDto {
//   @IsString()
//   @ApiProperty({ default: 'newPass' })
//   password: string;
// }

export class ChangeLocalUserPasswordDto extends PickType(CreateLocalUserDto, [
  'password',
] as const) {}
