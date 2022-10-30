import { User } from '../users/entities/user.entity';
import { roles } from './fake.user-roles';

let usersArray: User[] = [
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

export { usersArray };
