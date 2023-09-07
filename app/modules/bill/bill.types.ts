export interface IBill {
  id?: number;
  meterId: number;
  date?: Date;
  totalReading?: number;
  totalAmount: number;
  dueDate?: Date;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
