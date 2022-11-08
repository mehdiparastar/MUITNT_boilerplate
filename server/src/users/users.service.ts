import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { ApproveUserRolesDto } from './dto/userRoles/approve-user-roles.dto';
import { User } from './entities/user.entity';
import { UserRoles } from 'src/enum/userRoles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>, // private userRolesService: UserRolesService,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const defaultUserRoles = [UserRoles.section3ExpertL2];
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = this.usersRepo.create({
      email: email,
      password: hashedPassword,
      roles: defaultUserRoles,
    });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User[]> {
    if (!email) {
      throw new NotFoundException('user not found');
    }

    const find = await this.usersRepo.find({
      where: { email },
    });
    return find;
  }

  async findOneById(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException('user not found');
    }
    const find = await this.usersRepo.findOne({
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('user not found');
    }
    return find;
  }

  // async changeUserRoles(
  //   id: number,
  //   newRoles: ApproveUserRolesDto,
  // ): Promise<User> {
  //   const user: User = await this.findOneById(id);
  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }

  //   const updateUserRoles = await this.userRolesService.update(
  //     user.roles.id,
  //     newRoles,
  //   );

  //   user.roles = updateUserRoles;

  //   return user;
  // }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   const user: User = await this.findOneById(id);
  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }
  //   Object.assign(user, updateUserDto);
  //   return this.usersRepo.save(user);
  // }

  // async findAll(): Promise<User[]> {
  //   const allUsers: User[] = await this.usersRepo.find({
  //   });
  //   return allUsers;
  // }

  // async remove(id: number): Promise<User> {
  //   const user = await this.findOneById(id);
  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }
  //   return this.usersRepo.remove(user);
  // }
}
