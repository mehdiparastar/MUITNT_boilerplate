import { SvgIconComponent } from '@mui/icons-material';
import { IconTypeMap, ListItemIconProps } from '@mui/material';
import { AxiosError } from 'axios';
import { FC, ReactSVGElement } from 'react';

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
    userCtx: {
      profile: IUser | null | undefined;
      update: (user: IUser | null) => void;
    };
    accessTokenCtx: {
      token: string | null | undefined;
      update: (token: string | null) => void;
    };
    refreshTokenCtx: {
      token: string | null | undefined;
      update: (token: string | null) => void;
    };
    persistCtx: {
      value: boolean;
      update: (bool: boolean) => void;
    };
    loadingPersistCtx: {
      value: boolean;
      update: (bool: boolean) => void;
    };
    loadingFetchCtx: {
      value: boolean;
      update: (bool: boolean) => void;
    };
  }
}
