import { ITag } from 'models/TAGS/tag.model';

export interface IFile {
  id: number;

  name: string;

  tags?: ITag[];

  type: string;

  size: number;

  private: boolean;

  createdAt: Date;

  updatedAt: Date;

  owner: IUser;
}

export interface IFilePaginated {
  data: IFile[];
  count: number;
}
