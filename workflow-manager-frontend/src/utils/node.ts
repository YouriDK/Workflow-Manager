export interface Inode {
  id: any;
  name: any;
}
export enum Itype {
  "first",
  "seconde",
}

export interface ITask extends Inode {
  type: Itype;
}

export interface Icondition extends Inode {
  description: string;
}
