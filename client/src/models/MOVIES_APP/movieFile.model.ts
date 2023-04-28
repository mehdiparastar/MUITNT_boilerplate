import { ITag } from 'models/TAGS/tag.model';

export interface IMovieFile {
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

export interface IMovieFilePaginated {
  data: IMovieFile[];
  count: number;
}
