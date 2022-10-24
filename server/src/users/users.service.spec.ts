import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roles } from 'src/users/entities/roles.entity';
import { UserRoles } from '../enum/userRoles.enum';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const roles: Roles[] = [
  {
    id: 1,
    [UserRoles.superUser]: true,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 2,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: true,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 3,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: true,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 4,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: true,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 5,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: true,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 6,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: true,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 7,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: true,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 8,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: true,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 9,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: true,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 10,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: true,
    [UserRoles.section3ExpertL2]: false,
  } as Roles,
  {
    id: 11,
    [UserRoles.superUser]: false,
    [UserRoles.admin]: false,
    [UserRoles.adminSection1]: false,
    [UserRoles.adminSection2]: false,
    [UserRoles.adminSection3]: false,
    [UserRoles.section1ExpertL1]: false,
    [UserRoles.section1ExpertL2]: false,
    [UserRoles.section2ExpertL1]: false,
    [UserRoles.section2ExpertL2]: false,
    [UserRoles.section3ExpertL1]: false,
    [UserRoles.section3ExpertL2]: true,
  } as Roles,
];

const usersArray: User[] = [
  {
    id: 1,
    email: 'test01@test.com',
    password: 'test01',
    roles: roles[0],
  } as User,
  {
    id: 2,
    email: 'test02@test.com',
    password: 'test02',
    roles: roles[1],
  } as User,
  {
    id: 3,
    email: 'test03@test.com',
    password: 'test03',
    roles: roles[2],
  } as User,
  {
    id: 4,
    email: 'test04@test.com',
    password: 'test04',
    roles: roles[3],
  } as User,
  {
    id: 5,
    email: 'test05@test.com',
    password: 'test05',
    roles: roles[4],
  } as User,
  {
    id: 6,
    email: 'test06@test.com',
    password: 'test06',
    roles: roles[5],
  } as User,
  {
    id: 7,
    email: 'test07@test.com',
    password: 'test07',
    roles: roles[6],
  } as User,
  {
    id: 8,
    email: 'test08@test.com',
    password: 'test08',
    roles: roles[7],
  } as User,
  {
    id: 9,
    email: 'test09@test.com',
    password: 'test09',
    roles: roles[8],
  } as User,
  {
    id: 10,
    email: 'test010@test.com',
    password: 'test010',
    roles: roles[9],
  } as User,
  {
    id: 11,
    email: 'test011@test.com',
    password: 'test011',
    roles: roles[10],
  } as User,
];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide:getRepositoryToken(User),
          useValue:{
            findByEmail:jest.fn(),
            findOneById:jest.fn(),
            changeUserRoles:jest.fn(),
            update:jest.fn(),
            findAll:jest.fn(),
            remove:jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
