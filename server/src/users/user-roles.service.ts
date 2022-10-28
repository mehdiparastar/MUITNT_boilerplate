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

  async create() {
    const userRoles = this.userRolesRepo.create();
    return await this.userRolesRepo.save(userRoles);
  }

  async findOneById(id: number) {
    if (!id) {
      throw new NotFoundException('user roles not found');
    }
    const find = await this.userRolesRepo.findOne({ where: { id } });
    return find;
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
