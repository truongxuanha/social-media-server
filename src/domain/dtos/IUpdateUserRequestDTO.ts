import { Role } from "../enums/role.enum";

export interface IUpdateUserRequestDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}
