import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserRolesService } from './user-roles.service';
import { Repository } from 'typeorm';
import { roles as roles_ } from '../unit-test/fake.user-roles';
import { usersArray as usersArray_ } from '../unit-test/fake.users';
import { fakeUserRolesService } from './user-roles.service.fake';
import { Roles } from './entities/roles.entity';

declare var usersArray: User[];
declare var roles: Roles[];

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  globalThis.usersArray = usersArray_;
  globalThis.roles = roles_;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRolesService,
          useValue: fakeUserRolesService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(usersArray[0]),
            save: jest.fn().mockResolvedValue(usersArray[0]),
            find: jest.fn().mockResolvedValue(usersArray),
            findOne: jest.fn().mockResolvedValue(usersArray[0]),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    const newUser = await service.create(
      usersArray[0].email,
      usersArray[0].password,
    );
    expect(newUser).toEqual(usersArray[0]);
  });

  it('find user by email', async () => {
    const user = await service.findByEmail(usersArray[0].email);
    expect(user).toEqual(usersArray);
  });

  it('find user by id', async () => {
    const user = await service.findOneById(usersArray[0].id);
    expect(user).toEqual(usersArray[0]);
  });

  it('change user roles', async () => {
    const newRoles = await service.changeUserRoles(usersArray[0].id, roles[1]);
    expect(newRoles).toEqual(usersArray[0]);
  });

  it('update user', async () => {
    const updatedUser = await service.update(usersArray[0].id, {
      email: usersArray[1].email,
      password: usersArray[3].password,
    });
    expect(updatedUser).toEqual(usersArray[0]);
  });

  it('find all user', async () => {
    const allUsers = await service.findAll();
    expect(allUsers).toEqual(usersArray);
  });

  it('remove user', async () => {
    const remove = await service.remove(usersArray[0].id);
    expect(remove).toEqual(undefined);
  });
});
