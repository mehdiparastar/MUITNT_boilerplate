import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRolesService } from './user-roles.service';
import { Repository } from 'typeorm';
import { roles as roles_ } from '../unit-test/fake.user-roles';
import { Roles } from './entities/roles.entity';
import { NotFoundException } from '@nestjs/common';
import { usersArray as usersArray_ } from '../unit-test/fake.users';
import { User } from './entities/user.entity';

declare var usersArray: User[];
declare var roles: Roles[];

describe('UserRolesService', () => {
  let service: UserRolesService;
  let userRolesRepository: Repository<Roles>;
  globalThis.usersArray = usersArray_;
  globalThis.roles = roles_;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRolesService,
        {
          provide: getRepositoryToken(Roles),
          useValue: {
            create: jest.fn().mockResolvedValue(roles[0]),
            save: jest.fn().mockResolvedValue(roles[0]),
            findOne: jest.fn().mockResolvedValue(roles[0]),
          },
        },
      ],
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user roles', async () => {
    const newUserRoles = await service.create();
    expect(newUserRoles).toEqual(roles[0]);
  });

  it('find user roles by id', async () => {
    const userRoles = await service.findOneById(roles[0].id);
    expect(userRoles).toEqual(roles[0]);
    await expect(service.findOneById(null)).rejects.toThrow(NotFoundException);
  });

  it('update user roles', async () => {
    const newRole = { ...roles[3] };
    delete newRole.id;
    const updatedUserRoles = await service.update(roles[0].id, newRole);
    expect(updatedUserRoles).toEqual(roles[0]);
    await expect(service.update(null, newRole)).rejects.toThrow(
      NotFoundException,
    );
  });
});
