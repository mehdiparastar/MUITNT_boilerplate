import { pReqResultENUM } from "enum/pReqResult.enum";
import { UserRoles } from "enum/userRoles.enum";

export interface IPermissionRequest {
    id: number;
    user: IUser;
    adminMsg: string;
    role: UserRoles;
    result: pReqResultENUM;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPermissionRequestPaginated {
    data: IPermissionRequest[];
    count: number
}