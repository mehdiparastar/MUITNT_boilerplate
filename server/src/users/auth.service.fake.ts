import { BadRequestException } from '@nestjs/common';
import { passwordCheck } from '../helperFunctions/password-check';
import { saltedHashedPassword } from '../helperFunctions/salted-hashed-password';
import { AuthService } from './auth.service';
import { fakeUsersService } from './users.service.fake';

let fakeAuthService: Partial<AuthService> = {
  signup: async (email, password) => {
    const result = await saltedHashedPassword(password);
    const newUser = fakeUsersService.create(email, result);
    return newUser;
  },
  signin: async (email, password) => {
    const [user] = await fakeUsersService.findByEmail(email);
    const passCheck = await passwordCheck(password, user.password);
    if (!passCheck) {
      throw new BadRequestException('bad password');
    }
    return user;
  },
  changeUserEmail: async (id: number, email: string) => {
    const change = await fakeUsersService.update(id, { email });
    return change;
  },
  changeUserPassword: async (id: number, password: string) => {
    const hashedPass = await saltedHashedPassword(password);
    const change = await fakeUsersService.update(id, {
      password: hashedPass,
    });
    return change;
  },
};

export { fakeAuthService };
