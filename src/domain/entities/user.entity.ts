import { ICreateUserRequestDTO } from "../dtos/ICreateUserRequestDTO";
import { IUpdateUserRequestDTO } from "../dtos/IUpdateUserRequestDTO";
import { IUser } from "../interfaces/user.interface";
import { Email } from "../value-objects/email.vo";
import bcrypt from "bcryptjs";
export class User {
  private _id: string;
  private _name: string;
  private _email: Email;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date | null;
  constructor(props: IUser) {
    this._id = props.id;
    this._name = props.name;
    this._password = props.password;
    this._email = props.email;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
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
  get updatedAt(): Date | null {
    return this._updatedAt;
  }
  static async create({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<User> {
    const newEmail = new Email({ address: email });
    const hashedPassword = await this.hashPassword(password);
    return new User({
      id: crypto.randomUUID(),
      name,
      email: newEmail,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: null,
    });
  }
  static update(updatedUser: IUpdateUserRequestDTO) {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address;
    }
    return updatedUser;
  }

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  static async isValidPassword(
    inputPassword: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, passwordHash);
  }
}
