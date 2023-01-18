export interface IAuth {
    userProfile: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    persist: boolean;
}