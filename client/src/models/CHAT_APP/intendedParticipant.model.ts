import { chatIntendedParticipantStatus } from "enum/chatIntendedParticipantStatus.enum";
import { RoomDtoWithoutMessages } from "./room.model";

export interface RoomIntendedParticipantDto {
    id: number;
    status: chatIntendedParticipantStatus
    participant: IUser;
    room: RoomDtoWithoutMessages;
    createdAt: Date;
    updatedAt: Date;
    creator: IUser;
}      