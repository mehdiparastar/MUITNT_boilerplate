import { IsEmail, IsString } from 'class-validator';
import { CreateUserRolesDto } from '../userRoles/create-user-roles.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
