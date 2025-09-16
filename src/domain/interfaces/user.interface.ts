import { Email } from "../value-objects/email.vo";

export interface IUser {
  id: string;
  name: string;
  email: Email;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
