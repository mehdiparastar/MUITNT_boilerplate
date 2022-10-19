import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRolesDto } from './create-user-roles.dto';

export class UpdateUserDto extends PartialType(CreateUserRolesDto) {}
