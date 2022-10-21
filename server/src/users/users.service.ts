import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { User } from './entities/user.entity';
import { UserRolesService } from './user-roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private userRolesService: UserRolesService
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

  findByEmail(email:string){
    return this.usersRepo.findBy({email})
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
