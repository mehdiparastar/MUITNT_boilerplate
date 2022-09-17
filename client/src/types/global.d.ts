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
}
