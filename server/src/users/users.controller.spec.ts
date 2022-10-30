import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { fakeUsersService } from './users.service.fake';
import { fakeAuthService } from './auth.service.fake';
import { usersArray as usersArray_ } from '../unit-test/fake.users';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { roles as roles_ } from '../unit-test/fake.user-roles';
import { User } from './entities/user.entity';
import { Roles } from './entities/roles.entity';

declare var usersArray: User[];
declare var roles: Roles[];

describe('UsersController', () => {
  let controller: UsersController;
  globalThis.usersArray = usersArray_;
  globalThis.roles = roles_;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllByEmail(
      globalThis.usersArray[0].email,
    );
    expect(users).toEqual(
      globalThis.usersArray.filter(
        (user) => user.email === globalThis.usersArray[0].email,
      ),
    );
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findOneById(
      globalThis.usersArray[1].id.toString(),
    );
    expect(user).toEqual(globalThis.usersArray[1]);
  });

  it('findUser throws an err if user with given id is not found', async () => {
    await expect(controller.findOneById('10000')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('signIn updates session object and returns user and login and logout', async () => {
    const session: { userId?: number; userRoles?: string[] } = {};
    const newUser = await controller.create(
      { email: 'testCtrl@test.com', password: 'mehdi' },
      session,
    );
    expect(session.userId).toEqual(newUser.id);
    expect(session.userRoles).toBeDefined();

    const logOut = controller.signout(session);
    expect(session).toEqual({ userId: null, userRoles: [] });

    await expect(
      controller.signin(
        {
          email: 'testCtrl@test.com',
          password: 'mehdix',
        },
        session,
      ),
    ).rejects.toThrow(BadRequestException);

    const login = await controller.signin(
      {
        email: 'testCtrl@test.com',
        password: 'mehdi',
      },
      session,
    );

    expect(session.userId).toBeDefined();
    expect(session.userRoles).toBeDefined();
  });

  it('change email of user', async () => {
    const change = await controller.changeEmail(globalThis.usersArray[0], {
      email: 'parastar.mehdi@gmail.com',
    });
    expect(globalThis.usersArray[0].email).toEqual('parastar.mehdi@gmail.com');
  });

  it('change password of user', async () => {
    const session: { userId?: number; userRoles?: string[] } = {};
    const newUser = await controller.create(
      { email: 'testCtrl2@test.com', password: 'mehdi' },
      session,
    );
    const change = await controller.changePassword(
      globalThis.usersArray.filter(
        (user) => user.email === 'testCtrl2@test.com',
      )[0],
      { password: 'parastar' },
    );
    const logOut = controller.signout(session);
    const login = await controller.signin(
      {
        email: 'testCtrl2@test.com',
        password: 'parastar',
      },
      session,
    );
    expect(session.userId).toEqual(
      globalThis.usersArray.filter(
        (user: User) => user.email === 'testCtrl2@test.com',
      )[0].id,
    );
  });

  it('change user roles', async () => {
    const session: { userId?: number; userRoles?: string[] } = {};
    const login1 = await controller.signin(
      {
        email: 'testCtrl2@test.com',
        password: 'parastar',
      },
      session,
    );
    const change = await controller.approveUserRoles(
      usersArray[4].id.toString(),
      { adminSection1: true, adminSection2: true },
    );

    expect(usersArray[4].roles.adminSection1).toEqual(true);
    expect(usersArray[4].roles.adminSection2).toEqual(true);
  });
});
