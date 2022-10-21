import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(Roles) private userRolesRepo: Repository<Roles>,
  ) {}

  create() {
    const userRoles = this.userRolesRepo.create();
    return this.userRolesRepo.save(userRoles);
  }
}
