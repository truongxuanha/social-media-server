import { ICreateUserRequestDTO } from "../dtos/ICreateUserRequestDTO";
import { IUpdateUserRequestDTO } from "../dtos/IUpdateUserRequestDTO";
import { Role } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";
import { Email } from "../value-objects/email.vo";
import bcrypt from "bcryptjs";
export class User {
  private _id: string;
  private _name: string;
  private _email: Email;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _role: string;
  constructor(props: IUser) {
    this._id = props.id;
    this._name = props.name;
    this._password = props.password;
    this._email = props.email;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._role = props.role;
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get role(): string {
    return this._role;
  }
  static create({
    email,
    name,
    password,
    role = Role.USER,
  }: ICreateUserRequestDTO) {
    const newEmail = new Email({ address: email });
    return new User({
      id: crypto.randomUUID(),
      name,
      email: newEmail,
      password,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  static update(updatedUser: IUpdateUserRequestDTO) {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address;
    }
    return updatedUser;
  }
  static async isValidPassword(
    inputPassword: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, passwordHash);
  }
}
