import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { ApproveUserRolesDto } from './dto/userRoles/approve-user-roles.dto';
import { User } from './entities/user.entity';
import { UserRolesService } from './user-roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private userRolesService: UserRolesService,
  ) {}

  async create(email: string, password: string) {
    const userRoles = await this.userRolesService.create();
    const user = this.usersRepo.create({
      email: email,
      password: password,
      roles: userRoles,
    });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new NotFoundException('user not found');
    }
    try {
      const find = await this.usersRepo.find({
        where: { email },
        relations: {
          roles: true,
        },
      });
      return find;
    } catch (ex) {
      console.log(ex);
    }
  }

  async findOneById(id: number) {
    if (!id) {
      throw new NotFoundException('user not found');
    }
    const find = await this.usersRepo.findOne({
      where: { id },
      relations: {
        roles: true,
      },
    });
    if (!find) {
      throw new NotFoundException('user not found');
    }
    return find;
  }

  async changeUserRoles(id: number, newRoles: ApproveUserRolesDto) {
    const user: User = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const updateUserRoles = await this.userRolesService.update(
      user.roles.id,
      newRoles,
    );

    user.roles = updateUserRoles;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, updateUserDto);
    return this.usersRepo.save(user);
  }

  async findAll() {
    const allUsers: User[] = await this.usersRepo.find({
      relations: {
        roles: true,
      },
    });
    return allUsers;
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.usersRepo.remove(user);
  }
}
