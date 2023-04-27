import { appNameEnum } from 'enum/appName.enum';

export interface ITag {
  id: number;
  tag: string;
  appName: appNameEnum;
}

export interface IAddTag {
  tag: string;
  appName: appNameEnum;
}
