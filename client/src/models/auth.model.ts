export interface IAuth {
    accessToken: string | null;
    refreshToken: string | null;
    persist: boolean;
}