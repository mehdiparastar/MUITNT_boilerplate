import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { saltedHashedPassword } from '../helperFunctions/salted-hashed-password';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { passwordCheck } from '../helperFunctions/password-check';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const result = await saltedHashedPassword(password);
    const user = await this.usersService.create(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const passCheck = await passwordCheck(password, user.password);
    
    if (!passCheck) {
      throw new BadRequestException('bad password');
    }
    return user;
  }

  async changeUserEmail(id: number, email: string) {
    let userById: User;
    if (id) {
      userById = await this.usersService.findOneById(id);
      if (!userById) {
        throw new NotFoundException('user not found');
      }
    } else {
      throw new BadRequestException('credentials issue');
    }
    const change = await this.usersService.update(id, { email });
    return change;
  }

  async changeUserPassword(id: number, password: string) {
    let userById: User;
    if (id) {
      userById = await this.usersService.findOneById(id);
      if (!userById) {
        throw new NotFoundException('user not found');
      }
    } else {
      throw new BadRequestException('credentials issue');
    }

    const newPassword = password
      ? await saltedHashedPassword(password)
      : userById.password;

    return this.usersService.update(id, { password: newPassword });
  }
}
