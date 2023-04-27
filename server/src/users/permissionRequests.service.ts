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

import { UserRoles } from '../enum/userRoles.enum';
import { UpdatePermissionRequestDto } from './dto/permissionRequest/update-permission-request.dto';
import { UserPermissionRequest } from './entities/permission-requests.entity';
import { User } from './entities/user.entity';

@Injectable()
export class PermissionRequestsService {
  constructor(
    @InjectRepository(UserPermissionRequest)
    private permissionRequestsRepo: Repository<UserPermissionRequest>,
  ) {}

  async create(user: User, role: UserRoles): Promise<UserPermissionRequest> {
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

  async findByUser(user: User): Promise<UserPermissionRequest[]> {
    const find = await this.permissionRequestsRepo.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
    return find;
  }

  async findOneById(id: number): Promise<UserPermissionRequest> {
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
  ): Promise<UserPermissionRequest> {
    const pReq = await this.findOneById(id);
    if (!pReq) {
      throw new NotFoundException('user not found');
    }
    Object.assign(pReq, attrs);
    return this.permissionRequestsRepo.save(pReq);
  }

  async findAll(): Promise<UserPermissionRequest[]> {
    const allPReq: UserPermissionRequest[] = await this.permissionRequestsRepo.find(
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
  ): Promise<{ data: UserPermissionRequest[]; count: number }> {
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
  ): Promise<{ data: UserPermissionRequest[]; count: number }> {
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

  async remove(user: User, id: number): Promise<UserPermissionRequest> {
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

  async pReqSetToSeen(user: User, pReqId: number): Promise<UserPermissionRequest> {
    const update = await this.update(pReqId, {
      approver: user,
      result: permissionRequestResultEnum.seen,
    });
    return update;
  }

  async approvePReq(user: User, pReqId: number): Promise<UserPermissionRequest> {
    const update = await this.update(pReqId, {
      approver: user,
      result: permissionRequestResultEnum.accepted,
    });
    return update;
  }

  async rejectPReq(user: User, pReqId: number): Promise<UserPermissionRequest> {
    const update = await this.update(pReqId, {
      approver: user,
      result: permissionRequestResultEnum.rejected,
    });
    return update;
  }
}
