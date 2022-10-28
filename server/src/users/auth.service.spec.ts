import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { fakeUsersService } from './users.service.fake';
import { usersArray as usersArray_ } from '../unit-test/fake.users';
import { roles as roles_ } from '../unit-test/fake.user-roles';
import { User } from './entities/user.entity';
import { Roles } from './entities/roles.entity';

declare var usersArray: User[];
declare var roles: Roles[];

describe('AuthService', () => {
  let service: AuthService;
  globalThis.usersArray = usersArray_;
  globalThis.roles = roles_;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a new user with salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, storedHash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(storedHash).toBeDefined();
  });

  it('throwing an error on dupliucate email in signing up', async () => {
    await service.signup('testx@test.com', 'test');
    await expect(service.signup('testx@test.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throwing an error on signing in with unused email', async () => {
    await expect(service.signin('testy@test.com', 'test')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('testz@test.com', 'test');
    await expect(service.signin('testz@test.com', 'test_')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if correct password is provided', async () => {
    await service.signup('testw@test.com', 'test');
    const user = await service.signin('testw@test.com', 'test');
    expect(user).toBeDefined();
  });

  it('throws in change user email if id will not exist', async () => {
    await expect(
      service.changeUserEmail(null, 'test@test.com'),
    ).rejects.toThrow(BadRequestException);
    await expect(
      service.changeUserEmail(1000, 'test@test.com'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws in change user password if id will not exist', async () => {
    await expect(service.changeUserPassword(null, 'xx')).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.changeUserPassword(1000, 'xx')).rejects.toThrow(
      NotFoundException,
    );
  });
});
