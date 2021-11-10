export interface NewTask {
  taskName: string;
  userId: number;
  statusId: number;
  startDate: Date;
  endDate: Date;
  description: string;
}
