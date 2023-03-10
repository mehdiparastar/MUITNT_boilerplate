import { RoomIntendedParticipantDto } from "./intendedParticipant.model";
import { MessageDto } from "./message.model";

export interface RoomDtoWithoutMessages {
    id: number;
    title: string;
    caption: string;
    photo?: string;
    intendedParticipants: RoomIntendedParticipantDto[];
    createdAt: Date;
    updatedAt: Date;
    creator: IUser;
    onlineUsersCount?: number;
    status_delivered_users?: ICompressedUser[]
}

export type RoomDtoWithMessages = RoomDtoWithoutMessages & {
    messages: MessageDto[];
}

export interface ICreateChatRoomFormDto {
    title: string;
    caption: string;
    photo?: string;
    intendedParticipants: IUser[]
}