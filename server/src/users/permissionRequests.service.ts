import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permissionRequestResultEnum } from 'src/enum/permissionRequestResult.enum';
import { In, Repository } from 'typeorm';

import { authTypeEnum } from '../enum/authType.enum';
import { UserRoles } from '../enum/userRoles.enum';
import { getRolesArray } from '../helperFunctions/get-roles-array-from-roles-dto';
import { hashData } from '../helperFunctions/hash-data';
import { UpdatePermissionRequestDto } from './dto/permissionRequest/update-permission-request.dto';
import { UpdateLocalUserDto } from './dto/user/update-local-user.dto';
import { ApproveUserRolesDto } from './dto/userRoles/approve-user-roles.dto';
import { PermissionRequest } from './entities/permission-requests.entity';
import { User } from './entities/user.entity';

@Injectable()
export class PermissionRequestsService {
  constructor(
    @InjectRepository(PermissionRequest)
    private permissionRequestsRepo: Repository<PermissionRequest>,
  ) {}

  async create(user: User, role: UserRoles): Promise<PermissionRequest> {
    // Check if duplication
    const [pRExists] = await this.permissionRequestsRepo.find({
      relations: ['user'],
      where: {
        role,
        user: {
          id: user.id,
        },
      },
    });
    if (pRExists) {
      throw new BadRequestException('This request already exists');
    }
    console.log('create pReq');

    // Create new User
    const pReq = this.permissionRequestsRepo.create({
      user,
      role,
    });

    return this.permissionRequestsRepo.save(pReq);
  }

  async findByUser(user: User): Promise<PermissionRequest[]> {
    const find = await this.permissionRequestsRepo.find({
      relations: ['users'],
      where: { user: { id: user.id } },
    });
    return find;
  }

  async findOneById(id: number): Promise<PermissionRequest> {
    if (!id) {
      throw new NotFoundException('user not found');
    }
    const find = await this.permissionRequestsRepo.findOne({
      where: { id },
    });
    if (!find) {
      throw new NotFoundException('user not found');
    }
    return find;
  }

  async update(
    id: number,
    attrs: UpdatePermissionRequestDto,
  ): Promise<PermissionRequest> {
    const pReq = await this.findOneById(id);
    if (!pReq) {
      throw new NotFoundException('user not found');
    }
    Object.assign(pReq, attrs);
    return this.permissionRequestsRepo.save(pReq);
  }

  async findAll(): Promise<PermissionRequest[]> {
    const allPReq: PermissionRequest[] = await this.permissionRequestsRepo.find(
      {},
    );
    return allPReq;
  }

  async findMyAll(
    user: User,
    take?: number,
    skip?: number,
    accepted?: boolean,
    rejected?: boolean,
    unSeen?: boolean,
    seen?: boolean,
  ): Promise<{ data: PermissionRequest[]; count: number }> {
    const query = [
      accepted === true ? permissionRequestResultEnum.accepted : null,
      rejected === true ? permissionRequestResultEnum.rejected : null,
      unSeen === true ? permissionRequestResultEnum.unseen : null,
      seen === true ? permissionRequestResultEnum.seen : null,
    ].filter((item) => item !== null);

    const [result, total] = await this.permissionRequestsRepo.findAndCount({
      relations: ['user'],
      where: {
        user: { id: user.id },
        result: In(
          JSON.stringify(query) === JSON.stringify([])
            ? Object.values(permissionRequestResultEnum)
            : query,
        ),
      },
      order: { updatedAt: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async remove(id: number): Promise<PermissionRequest> {
    const pReq = await this.findOneById(id);
    if (!pReq) {
      throw new NotFoundException('user not found');
    }
    return this.permissionRequestsRepo.remove(pReq);
  }
}
