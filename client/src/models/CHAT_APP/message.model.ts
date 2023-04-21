import { RoomDtoWithoutMessages } from "./room.model";

export interface MessageDto {
    id: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    writer: IUser;
    room: RoomDtoWithoutMessages;
    delivered: ICompressedUser[];
    seen: ICompressedUser[];
    isSeen?: boolean
    isDelivered?: boolean
}

export interface IChatRoomAddMessageFormDto {
    message: string,
    roomId: number
}