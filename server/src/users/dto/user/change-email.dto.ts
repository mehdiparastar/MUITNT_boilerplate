import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// export class ChangeUserEmailDto {
//   @IsEmail()
//   @ApiProperty({ default: 'newtest@test.com' })
//   email: string;
// }

export class ChangeUserEmailDto extends PickType(CreateUserDto, [
  'email',
] as const) {}
