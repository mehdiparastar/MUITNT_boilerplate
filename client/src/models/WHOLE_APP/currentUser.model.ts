export interface ICurrentUser extends IUser {}

export interface IEditCurrentUserDto {
  name: string;
  photo: string;
}

export interface IChangeCurrentUserPasswordDto {
  password: string;
}
