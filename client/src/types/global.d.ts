import { pReqResultENUM } from 'enum/pReqResult.enum';
import { FC } from 'react';

export {};

declare global {
  type themeMode = 'light' | 'dark';

  type themePaletteType = 'green' | 'blue' | 'indigo' | 'pink' | 'orange';

  type Props = {
    children?: React.ReactNode;
  };

  type layoutProps = Props & {
    title?: string;
  };

  type HideOnScrollProps = {
    children: React.ReactElement;
  };

  interface IRoute {
    key: string;
    title: string;
    path: string;
    enabled: boolean;
    component: FC<{}>;
    layout: FC<Props>;
    isProtected: boolean;
  }

  type navPage = {
    title: string;
    key: string;
    pages: {
      title: string;
      href: string;
      icon?: JSX.Element;
    }[];
  };

  interface IAppError {
    message: string;
  }

  interface IApiResponse<T> {
    data: T;
    error: IAppError | null;
  }

  interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
  }

  interface IUser {
    id?: number;
    email?: string;
    provider?: string;
    providerId?: string;
    name?: string;
    photo?: string;
    roles?: string[];
  }

  interface ILocalRegisterDto {
    email: string;
    password: string;
    name: string;
    photo?: string;
  }

  interface IAuthContext {
    userProfile: IUser | null | undefined;
    setUserProfile: (user: IUser | null) => void;
    accessToken: string | null | undefined;
    setAccessToken: (token: string | null | undefined) => void;
    refreshToken: string | null | undefined;
    setRefreshToken: (token: string | null | undefined) => void;
    persist: boolean;
    setPersist: (bool: boolean) => void;
    loadingPersist: boolean;
    setLoadingPersist: (bool: boolean) => void;
    loadingFetch: boolean;
    setLoadingFetch: (bool: boolean) => void;
  }

  interface IPermissionRequest {
    id: number;
    user: IUser;
    adminMsg: string;
    role: UserRoles;
    result: pReqResultENUM;
    createdAt: Date;
    updatedAt: Date;
  }
}
