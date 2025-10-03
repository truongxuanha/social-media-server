export interface IUpdateUserRequestDTO {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
}
