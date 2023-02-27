// ----------------------------------------------------------------------

export interface IFileShared {
  id: string;
  name: string;
  email: string;
  avatar: string;
  permission: string;
}

export interface ISchoolManager {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface IFileManager {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  tags: string[];
  isFavorited: boolean;
  shared: IFileShared[] | null;
  dateCreated: Date | number | string;
  dateModified: Date | number | string;
}

export type IFile = IFileManager | ISchoolManager;
