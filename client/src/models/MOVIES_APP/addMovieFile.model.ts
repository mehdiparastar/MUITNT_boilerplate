import { ITag } from 'models/TAGS/tag.model';

export interface IAddMovieFileDto extends File {
  tags?: ITag[];
  private?: boolean;
  preview?: string;
}

export interface IAddMovieFileInfoDto {
  name: string;

  tags?: ITag[];

  type: string;

  size: number;

  private: boolean;

  fileHash: string;

  totalSegments: number;
}
