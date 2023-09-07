export interface IConsumer {
  id?: number;
  email: string;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId?: number;
}
