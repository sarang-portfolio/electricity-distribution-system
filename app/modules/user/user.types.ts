export interface IUser {
  id?: number;
  username: string;
  email: string;
  roleId?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
