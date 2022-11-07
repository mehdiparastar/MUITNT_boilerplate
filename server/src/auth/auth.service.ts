import { forwardRef, Inject, Injectable, NotAcceptableException, OnModuleInit } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthService implements OnModuleInit {
  private usersService: UsersService
  constructor(
    // @Inject(forwardRef(()=>UsersService))
    private jwtService: JwtService,

    private moduleRef: ModuleRef
  ) {}

  async onModuleInit() {
    this.usersService =await this.moduleRef.resolve(UsersService);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashedPassword);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
