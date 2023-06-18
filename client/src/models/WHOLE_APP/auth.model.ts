export interface IAuth {
  accessToken: string | null;
  refreshToken: string | null;
  streamToken: string | null;
  persist: boolean;
}
