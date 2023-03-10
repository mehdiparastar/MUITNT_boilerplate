export interface MessageDto {
    id: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    writer: IUser;
    status_delivered_users: ICompressedUser[]
    isSeen?: boolean
    isDelivered?: boolean
}

export interface IChatRoomAddMessageFormDto {
    message: string,
    roomId: number
}