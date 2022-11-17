import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

import { authTypeEnum } from '../../enum/authType.enum';
import { UserRoles } from '../../enum/userRoles.enum';
import { hashData } from '../../helperFunctions/hash-data';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

let getFakeUsersRepo = async () => [
  {
    id: 1,
    provider: authTypeEnum.local,
    email: 'inDBtest01@test.com',
    password: await hashData('test'),
    providerId: null,
    name: null,
    photo: null,
    roles: [UserRoles.section3ExpertL2],
    refreshToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User,
  {
    id: 2,
    provider: authTypeEnum.local,
    email: 'inDBtest02@test.com',
    password: await hashData('test'),
    providerId: null,
    name: null,
    photo: null,
    roles: [UserRoles.section3ExpertL2],
    refreshToken: 'null',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    provider: authTypeEnum.local,
    email: 'inDBtest03@test.com',
    password: await hashData('test'),
    providerId: null,
    name: null,
    photo: null,
    roles: [UserRoles.section3ExpertL2],
    refreshToken: 'null',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('AuthController', () => {
  let authController: AuthController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersRepo: User[];

  beforeEach(async () => {
    fakeUsersRepo = await getFakeUsersRepo();

    fakeUsersService = {
      changeUserRoles: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      changeUserEmail: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      changeUserPassword: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      findAll: jest.fn().mockResolvedValue(fakeUsersRepo),
      findByEmail: jest.fn().mockResolvedValue(fakeUsersRepo),
      findOneById: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      remove: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
    };
    fakeAuthService = {
      createNewLocalUser: jest.fn().mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      } as IJWTTokensPair),
      login: jest.fn().mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      } as IJWTTokensPair),
      logout: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      refreshTokens: jest.fn().mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      } as IJWTTokensPair),
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        JwtModule.register({}),
      ],
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('check create', async () => {
    expect(
      await authController.create({ email: 'test@test.com', password: 'test' }),
    ).toHaveProperty('accessToken');
  });

  it('check login', async () => {
    expect(await authController.login({} as Request)).toHaveProperty(
      'accessToken',
    );
  });

  it('check google login callback', async () => {
    expect(
      await authController.googleLoginCallback({} as Request),
    ).toHaveProperty('accessToken');
  });

  it('check user profile', async () => {
    expect(
      await authController.getProfile({ user: fakeUsersRepo[0] } as Request),
    ).toHaveProperty('id');
  });

  it('check user logout', async () => {
    expect(
      await authController.getProfile({ user: fakeUsersRepo[0] } as Request),
    ).toHaveProperty('id');
  });

  it('check get new token pairs using refresh', async () => {
    expect(
      await authController.refreshTokens({
        user: fakeUsersRepo[0],
      } as Request),
    ).toHaveProperty('accessToken');
  });

  it('check approve user role', async () => {
    expect(
      await authController.approveUserRoles('1', { admin: true }),
    ).toHaveProperty('id');
  });

  it('check change user email', async () => {
    expect(
      await authController.changeEmail(fakeUsersRepo[0], {
        email: 'test@test.com',
      }),
    ).toHaveProperty('id');
  });

  it('check change user password', async () => {
    expect(
      await authController.changePassword(fakeUsersRepo[0], {
        password: 'test',
      }),
    ).toHaveProperty('id');
  });

  it('check get all users', async () => {
    expect(await authController.findAll()).toEqual(fakeUsersRepo);
  });

  it('check find by email', async () => {
    expect(await authController.findAllByEmail('test@test.com')).toEqual(
      fakeUsersRepo,
    );
  });

  it('check find by Id', async () => {
    expect(await authController.findOneById('test@test.com')).toEqual(
      fakeUsersRepo[0],
    );
  });

  it('check delete user', async () => {
    expect(await authController.remove('1')).toEqual(
      fakeUsersRepo[0],
    );
  });
});
