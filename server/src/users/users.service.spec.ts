import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from 'src/users/entities/roles.entity';
import { UserRoles } from '../enum/userRoles.enum';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const roles: Roles[] = [
  {
    id: 1,
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
  },
];
const usersArray: User[] = [
  {
    id: 1,
    email: 'test01@test.com',
    password: 'test01',
    roles: roles[0],
  },
];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
