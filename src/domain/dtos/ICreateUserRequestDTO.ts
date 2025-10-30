import { Role } from "../enums/role.enum";

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
