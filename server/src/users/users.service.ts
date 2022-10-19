import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { Roles } from './entities/roles.entity';
import { User } from './entities/user.entity';
import { CreateUserRolesDto } from './dto/userRoles/create-user-roles.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Roles) private userRolesRepo: Repository<Roles>,
  ) {}

  async createUserRoles(createUserRolesDto: CreateUserRolesDto) {
    const userRoles = this.userRolesRepo.create(createUserRolesDto);
    return this.userRolesRepo.save(userRoles);
  }

  async create(createUserDto: CreateUserDto) {
    const userRoles = await this.createUserRoles({});
    const user = this.usersRepo.create({
      email: createUserDto.email,
      password: createUserDto.password,
      roles: userRoles,
    });
    return this.usersRepo.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
