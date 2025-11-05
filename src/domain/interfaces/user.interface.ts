import { Role } from "../enums/role.enum";
import { Email } from "../value-objects/email.vo";

export interface IUser {
  readonly id: string;
  name: string;
  email: Email;
  password: string;
  readonly createdAt: Date;
  updatedAt: Date;
  role: Role;
}
