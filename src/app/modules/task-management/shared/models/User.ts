export class User {
  userId?: number;
  firstName: string;
  lastName: string;

  constructor(userId: number, firstName: string, lastName: string) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
