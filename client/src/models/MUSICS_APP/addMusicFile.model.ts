import { ITag } from 'models/TAGS/tag.model';

export interface IAddMusicFileDto extends File {
  tags?: ITag[];
  private?: boolean;
  preview?: string;
}

export interface IAddMusicFileInfoDto {
  name: string;

  tags?: ITag[];

  type: string;

  size: number;

  private: boolean;

  fileHash: string;

  totalSegments: number;
}
