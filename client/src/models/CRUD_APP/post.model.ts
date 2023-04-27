import { pReqResultENUM } from 'enum/pReqResult.enum';
import { reactionTypeEnum } from 'enum/reactionType.enum';
import { UserRoles } from 'enum/userRoles.enum';

export type ICRUDAPPReaction1 = {
  [key in reactionTypeEnum]: number;
};

export type ICRUDAPPReaction = {
  id: number;
  type: reactionTypeEnum;
  creator: { id: number };
};

export interface ICRUDAPPPost {
  id: number;
  title: string;
  caption: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  reactions: ICRUDAPPReaction[];
}

export interface ICRUDAPPCreatePostDto {
  title: string;
  caption: string;
}

export interface ICRUDAPPUpdatePostDto extends Partial<ICRUDAPPCreatePostDto> {
  id: number;
}

export interface ICRUDAPPPostPaginated {
  data: ICRUDAPPPost[];
  count: number;
}
