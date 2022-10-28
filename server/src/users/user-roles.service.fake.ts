import { Roles } from './entities/roles.entity';
import { UserRolesService } from './user-roles.service';

let fakeUserRolesService: Partial<UserRolesService> = {
  create: () => {
    const role = globalThis.roles[10];
    role.id = globalThis.roles.length;
    globalThis.roles.push(role);
    return Promise.resolve(role);
  },
  findOneById: (id: number) => {
    const [find] = globalThis.roles.filter((role) => role.id === id);
    return Promise.resolve(find);
  },
  update: (id: number, newUserRole: Roles) => {
    globalThis.roles = globalThis.roles.map((role) =>
      role.id === id ? { ...role, ...newUserRole } : role,
    );
    const [updatedRole] = globalThis.roles.filter((role) => role.id === id);
    return Promise.resolve(updatedRole);
  },
};

export { fakeUserRolesService };
