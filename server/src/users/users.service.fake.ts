import { roles } from '../unit-test/fake.user-roles';
import { UsersService } from './users.service';

let fakeUsersService: Partial<UsersService> = {
  create: (email: string, password: string) => {
    const role = roles[10];
    const newUser = {
      id: globalThis.usersArray.length,
      email,
      password,
      roles: role,
    };
    globalThis.usersArray.push(newUser);
    return Promise.resolve(newUser);
  },

  findByEmail: (email) => {
    const find = globalThis.usersArray.filter((user) => user.email === email);
    return Promise.resolve(find);
  },

  findOneById: (id) => {
    const [find] = globalThis.usersArray.filter((user) => user.id === id);
    return Promise.resolve(find);
  },

  changeUserRoles: (id, newRoles) => {
    const [change] = globalThis.usersArray.filter((user) => user.id === id);
    change.roles = { ...change.roles, ...newRoles };
    return Promise.resolve(change);
  },

  update: (id, newUser) => {
    let [change] = globalThis.usersArray.filter((user) => user.id === id);
    change = { ...change, ...newUser };
    globalThis.usersArray = globalThis.usersArray.map((user) =>
      user.id === id ? change : user,
    );
    return Promise.resolve(change);
  },

  findAll: () => {
    return Promise.resolve(globalThis.usersArray);
  },

  remove: (id) => {
    const find = globalThis.usersArray.find((user) => user.id === id);
    globalThis.usersArray = globalThis.usersArray.filter(
      (user) => user.id !== id,
    );
    return Promise.resolve(find);
  },
};

export { fakeUsersService };
