import { ITag } from 'models/TAGS/tag.model';

export interface IAddFileDto extends File {
  tags?: ITag[];
  private?: boolean;
  preview?: string;
}
