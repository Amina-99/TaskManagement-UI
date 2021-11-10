import { Status } from './Status';
import { User } from './User';

export class Task {
  taskId: number;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  user: User;
  status: Status;

  constructor(
    taskId: number,
    taskName: string,
    description: string,
    startDate: Date,
    endDate: Date,
    user: User,
    status: Status
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.user = user;
    this.status = status;
  }
}
