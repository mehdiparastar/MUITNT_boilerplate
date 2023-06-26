import { IMusicFile } from './musicFile.model';

export interface IMusicSocket {
  [fileName: string]: {
    progress?: number;
    complete: boolean;
    fileInfo: IMusicFile;
  };
}
