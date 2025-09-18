import { ICreateUserRequestDTO } from "../dtos/ICreateUserRequestDTO";
import IUpdateUserRequestDTO from "../dtos/IUpdateUserRequestDTO";
import { IUser } from "../interfaces/user.interface";
import { Email } from "../value-objects/email.vo";

export class User {
  private _id: string;
  private _name: string;
  private _email: Email;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  static create({
    id,
    email,
    name,
    password,
    createdAt,
    updatedAt,
  }: ICreateUserRequestDTO) {
    const newEmail = new Email({ address: email });
    return new User({
      id,
      createdAt,
      updatedAt,
      name,
      email: newEmail,
      password,
    });
  }

  static update(updatedUser: IUpdateUserRequestDTO) {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address;
    }
    return updatedUser;
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

  constructor(props: IUser) {
    this._id = props.id;
    this._name = props.name;
    this._password = props.password;
    this._email = props.email;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }
}
