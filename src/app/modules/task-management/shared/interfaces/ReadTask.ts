import { StatusRead } from './StatusRead';
import { UserRead } from './UserRead';

export interface ReadTask {
  taskId: number;
  description: string;
  status: StatusRead;
  user: UserRead;
  taskName: string;
  startDate: Date;
  endDate: Date;
}
