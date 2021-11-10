export class Status {
  statusId: number;
  statusDescription: string;

  constructor(statusId: number, statusDescription: string) {
    this.statusId = statusId;
    this.statusDescription = statusDescription;
  }
}
