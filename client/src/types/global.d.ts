import { SvgIconComponent } from '@mui/icons-material';
import { IconTypeMap, ListItemIconProps } from '@mui/material';
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

  interface Route {
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
  interface Message {
    text: string;
  }
  interface AppError {
    message: string;
  }
  interface ApiResponse {
    data: Message | null;
    error: AppError | null;
  }
  interface Auth0Resource {
    path: string;
    label: string;
  }
  interface UserProfile {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
  }
}
