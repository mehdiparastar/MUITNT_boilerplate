import { ITag } from 'models/TAGS/tag.model';

export interface IAddMovieFileDto extends File {
  tags?: ITag[];
  private?: boolean;
  preview?: string;
}
