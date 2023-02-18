export interface MessageDto {
    id: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    writer: IUser;
}
