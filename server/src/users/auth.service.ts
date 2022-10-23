import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async saltedHashedPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  async signup(email: string, password: string) {
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const result = await this.saltedHashedPassword(password);
    const user = await this.usersService.create(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
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

    return this.usersService.update(id, { email });
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
      ? await this.saltedHashedPassword(password)
      : userById.password;

    return this.usersService.update(id, { password: newPassword });
  }
}
