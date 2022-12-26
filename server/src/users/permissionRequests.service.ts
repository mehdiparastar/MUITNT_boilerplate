import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permissionRequestResultEnum } from 'src/enum/permissionRequestResult.enum';
import { strToBool } from 'src/helperFunctions/strToBool';
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

    // Create new User
    const pReq = this.permissionRequestsRepo.create({
      user,
      role,
    });

    return this.permissionRequestsRepo.save(pReq);
  }

  async findByUser(user: User): Promise<PermissionRequest[]> {
    const find = await this.permissionRequestsRepo.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
    return find;
  }

  async findOneById(id: number): Promise<PermissionRequest> {
    if (!id) {
      throw new NotFoundException('user not found');
    }
    const find = await this.permissionRequestsRepo.findOne({
      relations: ['user'],
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

  async findAllToApprove(
    user: User,
    take?: number,
    skip?: number,
    accepted?: boolean,
    rejected?: boolean,
    unSeen?: boolean,
    seen?: boolean,
    selectedUserId?: string | null | undefined,
  ): Promise<{ data: PermissionRequest[]; count: number }> {
    const resultQuery = [
      accepted === true ? permissionRequestResultEnum.accepted : null,
      rejected === true ? permissionRequestResultEnum.rejected : null,
      unSeen === true ? permissionRequestResultEnum.unseen : null,
      seen === true ? permissionRequestResultEnum.seen : null,
    ].filter((item) => item !== null);

    const [result, total] = await this.permissionRequestsRepo.findAndCount({
      relations: ['user'],
      where: {
        ...(strToBool(selectedUserId) && {
          user: { id: Number(selectedUserId) },
        }),
        result: In(
          JSON.stringify(resultQuery) === JSON.stringify([])
            ? Object.values(permissionRequestResultEnum)
            : resultQuery,
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

  async remove(user: User, id: number): Promise<PermissionRequest> {
    const pReq = await this.findOneById(id);
    if (!pReq) {
      throw new NotFoundException('permission request not found');
    }
    if (pReq.user.id !== user.id) {
      throw new NotAcceptableException(
        'You only could remove requests that are your own!',
      );
    }
    if (pReq.result !== permissionRequestResultEnum.unseen) {
      throw new NotAcceptableException(
        'You can only remove requests that have an unseen tag!',
      );
    }

    return this.permissionRequestsRepo.remove(pReq);
  }

  async pReqSetToSeen(user: User, pReqId: number): Promise<PermissionRequest> {
    const update = await this.update(pReqId, {
      approver: user,
      result: permissionRequestResultEnum.seen,
    });
    return update;
  }

  async approvePReq(user: User, pReqId: number): Promise<PermissionRequest> {
    const update = await this.update(pReqId, {
      approver: user,
      result: permissionRequestResultEnum.accepted,
    });
    return update;
  }

  async rejectPReq(user: User, pReqId: number): Promise<PermissionRequest> {
    const update = await this.update(pReqId, {
      approver: user,
      result: permissionRequestResultEnum.rejected,
    });
    return update;
  }
}
