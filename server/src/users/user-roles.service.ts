import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserRolesDto } from './dto/userRoles/update-user-roles.dto';
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

  findOneById(id: number) {
    if (!id) {
      throw new NotFoundException('userRoles not found');
    }
    return this.userRolesRepo.findOne({ where: { id } });
  }

  async update(id: number, updateUserRolesDto: UpdateUserRolesDto) {
    const userRoles = await this.findOneById(id);
    if (!userRoles) {
      throw new NotFoundException('user roles not found');
    }
    Object.assign(userRoles, updateUserRolesDto);
    return this.userRolesRepo.save(userRoles);
  }
}
