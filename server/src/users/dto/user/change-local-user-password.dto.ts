import { PickType } from '@nestjs/swagger';

import { CreateLocalUserDto } from './create-local-user.dto';

// export class ChangeLocalUserPasswordDto {
//   @IsString()
//   @ApiProperty({ default: 'newPass' })
//   password: string;
// }

export class ChangeLocalUserPasswordDto extends PickType(CreateLocalUserDto, [
  'password',
] as const) {}
