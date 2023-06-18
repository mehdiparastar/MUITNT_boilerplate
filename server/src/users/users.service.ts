import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { authTypeEnum } from '../enum/authType.enum';
import { UserRoles } from '../enum/userRoles.enum';
import { getRolesArray } from '../helperFunctions/get-roles-array-from-roles-dto';
import { hashData } from '../helperFunctions/hash-data';
import { UpdateLocalUserDto } from './dto/user/update-local-user.dto';
import { ApproveUserRolesDto } from './dto/userRoles/approve-user-roles.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async createUserWithUserPass(
    email: string,
    password: string,
    name: string,
    photo?: string,
  ): Promise<User> {
    // Check if user exists
    const [userExists] = await this.findByEmail(email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const defaultUserRoles =
      email === 'parastar.mehdi@gmail.com' || email === 'm.parastar@udb.ir'
        ? [UserRoles.superUser, UserRoles.userManagementAppUserLL]
        : [UserRoles.userManagementAppUserLL];

    // Create new User
    const user = this.usersRepo.create({
      email: email,
      password: password,
      name: name,
      roles: defaultUserRoles,
      provider: authTypeEnum.local,
      photo: photo,
    });

    return this.usersRepo.save(user);
  }

  async createUserWithGoogle(googleUser: IGoogleUser): Promise<User> {
    // Check if user exists
    const [userExists] = await this.findByEmail(googleUser.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const defaultUserRoles =
      googleUser.email === 'parastar.mehdi@gmail.com' ||
      googleUser.email === 'm.parastar@udb.ir'
        ? [UserRoles.superUser, UserRoles.userManagementAppUserLL]
        : [UserRoles.userManagementAppUserLL];

    // Create new User
    const user = this.usersRepo.create({
      ...googleUser,
      roles: defaultUserRoles,
      provider: authTypeEnum.google,
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

  async update(id: number, attrs: UpdateLocalUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    const save = await this.usersRepo.save(user);
    return save;
  }

  async changeUserRoles(
    id: number,
    newRoles: ApproveUserRolesDto,
  ): Promise<User> {
    const user: User = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const updateUserRoles = await this.update(id, {
      roles: getRolesArray(newRoles),
    });

    return updateUserRoles;
  }

  async approveRoleAsSuperUser(email: string): Promise<User> {
    const [user] = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const updateUserRoles = await this.update(user.id, {
      roles: getRolesArray({ [UserRoles.superUser]: true }),
    });

    return updateUserRoles;
  }

  async changeUserEmail(id: number, newEmail: string): Promise<User> {
    const isLocalUser =
      (await this.findOneById(id)).provider === authTypeEnum.local;
    if (!isLocalUser) {
      throw new NotAcceptableException(
        "you can change mail of only users that have been registered as 'local'!",
      );
    }
    const update = await this.update(id, { email: newEmail });

    return update;
  }

  async changeLocalUserProfileDetail(
    id: number,
    newName: string,
    newPhoto: string,
  ): Promise<User> {
    const isLocalUser =
      (await this.findOneById(id)).provider === authTypeEnum.local;
    if (!isLocalUser) {
      throw new NotAcceptableException(
        "you can change profile of only users that have been registered as 'local'!",
      );
    }
    const update = await this.update(id, { name: newName, photo: newPhoto });

    return update;
  }

  async changeUserPassword(id: number, newPassword: string): Promise<User> {
    const isLocalUser =
      (await this.findOneById(id)).provider === authTypeEnum.local;
    if (!isLocalUser) {
      throw new NotAcceptableException(
        "you can change password of only users that have been registered as 'local'!",
      );
    }
    const hashedNewPassword = await hashData(newPassword);
    const update = await this.update(id, { password: hashedNewPassword });

    return update;
  }

  async findAll(): Promise<User[]> {
    const allUsers: User[] = await this.usersRepo.find({});
    return allUsers;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.usersRepo.remove(user);
  }
}
