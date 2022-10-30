import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// export class ChangeUserPasswordDto {
//   @IsString()
//   @ApiProperty({ default: 'newPass' })
//   password: string;
// }

export class ChangeUserPasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {}
