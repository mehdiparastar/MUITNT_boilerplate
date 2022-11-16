import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRoles } from '../../enum/userRoles.enum';
import { authTypeEnum } from '../../enum/authType.enum';
import { hashData } from '../../helperFunctions/hash-data';
import { UsersService } from '../users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

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

describe('UsersService', () => {
  let service: UsersService;
  let fakeUsersRepo: User[];
  let fakeRepositoryService: any;

  beforeEach(async () => {
    fakeUsersRepo = await getFakeUsersRepo();
    fakeRepositoryService = {
      create: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      save: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      find: jest.fn().mockResolvedValue([fakeUsersRepo[0], fakeUsersRepo[1]]),
      findOne: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
      ],
      providers: [
        ConfigService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: fakeRepositoryService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('check creating users with credentials.', async () => {
    await expect(
      service.createUserWithUserPass('test@test.com', 'test'),
    ).rejects.toThrow(BadRequestException);

    fakeRepositoryService.find = jest.fn().mockResolvedValue([]);
    expect(
      await service.createUserWithUserPass('test@test.com', 'test'),
    ).toHaveProperty('id');
  });

  it('check find by email', async () => {
    await expect(service.findByEmail(null)).rejects.toThrow(NotFoundException);
  });

  it('check find one by id', async () => {
    await expect(service.findOneById(null)).rejects.toThrow(NotFoundException);

    fakeRepositoryService.findOne = jest
      .fn()
      .mockResolvedValue(fakeUsersRepo[0]);
    expect(await service.findOneById(1)).toHaveProperty('id');

    fakeRepositoryService.findOne = jest.fn().mockResolvedValue(null);
    await expect(service.findOneById(100)).rejects.toThrow(NotFoundException);
  });

  it('check update include user role or email or password', async () => {
    fakeRepositoryService.findOne = jest
      .fn()
      .mockResolvedValue(fakeUsersRepo[0]);
    expect(
      await service.update(1, { email: 'test1@test1.com' }),
    ).toHaveProperty('id');
  });
});
