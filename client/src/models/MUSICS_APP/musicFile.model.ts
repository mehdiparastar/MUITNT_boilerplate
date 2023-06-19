import { ITag } from 'models/TAGS/tag.model';

export interface IMusicFile {
  id: number;

  name: string;

  tags?: ITag[];

  type: string;

  size: number;

  fileHash: string;

  hlsUrl: string;

  streamable: boolean;

  private: boolean;

  createdAt: Date;

  updatedAt: Date;

  owner: IUser;

  totalSegments: number;

  uploadedComplete: boolean;
}

export interface IMusicFilePaginated {
  data: IMusicFile[];
  count: number;
}
