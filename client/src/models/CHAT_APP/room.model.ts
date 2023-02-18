import { MessageDto } from "./message.model";

export interface RoomDtoWithoutMessages {
    id: number;
    title: string;
    caption: string;
    photo?: string;
    participants: IUser[];
    admins: IUser[];
    createdAt: Date;
    updatedAt: Date;
    creator: IUser;
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