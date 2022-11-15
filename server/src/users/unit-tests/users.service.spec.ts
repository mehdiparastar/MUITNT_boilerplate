import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRoles } from '../../enum/userRoles.enum';
import { authTypeEnum } from '../../enum/authType.enum';
import { hashData } from '../../helperFunctions/hash-data';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { validateHashedData } from '../../helperFunctions/validate-hashed-data';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

let getFakeUsersRepo = async () => [
  {
    id: 0,
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
    id: 1,
    provider: authTypeEnum.local,
    email: 'inDBtest02@test.com',
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
    email: 'inDBtest03@test.com',
    password: await hashData('test'),
    providerId: null,
    name: null,
    photo: null,
    roles: [UserRoles.section3ExpertL2],
    refreshToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User,
];

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let fakeUsersRepo: User[];
  let fakeUsersDto: CreateUserDto[] = [
    {
      email: 'toEnterTestUser01@test.com',
      password: 'test01',
    },
    {
      email: 'toEnterTestUser02@test.com',
      password: 'test02',
    },
    {
      email: 'toEnterTestUser03@test.com',
      password: 'test03',
    },
  ];

  beforeEach(async () => {
    fakeUsersRepo = await getFakeUsersRepo();

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
          useValue: {
            create: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
            save: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
            find: jest
              .fn()
              .mockResolvedValue([fakeUsersRepo[0], fakeUsersRepo[1]]),
            findOne: jest.fn().mockResolvedValue(fakeUsersRepo[0]),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
