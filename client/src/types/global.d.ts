import { pReqResultENUM } from 'enum/pReqResult.enum';
import { FC } from 'react';
import * as yup from 'yup';

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

  type ConditionalSchema<T> = T extends string
    ? yup.StringSchema
    : T extends number
    ? yup.NumberSchema
    : T extends boolean
    ? yup.BooleanSchema
    : T extends Record<any, any>
    ? yup.AnyObjectSchema
    : T extends Array<any>
    ? yup.ArraySchema<any, any>
    : yup.AnySchema;

  type Shape<Fields> = {
    [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
  };

  type navPage = {
    title: string;
    key: string;
    pages: {
      title: string;
      href: string;
      icon?: JSX.Element;
    }[];
  };

  interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    streamToken: string;
  }

  interface IUser {
    id?: number;
    email?: string;
    provider?: string;
    providerId?: string;
    name?: string;
    photo?: string;
    roles?: string[];
    streamToken?: string;
  }

  interface ICompressedUser {
    id?: number;
    email?: string;
    name?: string;
    streamToken?: string;
  }
}
