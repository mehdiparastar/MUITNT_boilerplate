import { PickType } from '@nestjs/mapped-types';

import { CreateLocalUserDto } from './create-local-user.dto';

// export class ChangeUserEmailDto {
//   @IsEmail()
//   @ApiProperty({ default: 'newtest@test.com' })
//   email: string;
// }

export class ChangeLocalUserEmailDto extends PickType(CreateLocalUserDto, [
  'email',
] as const) {}
