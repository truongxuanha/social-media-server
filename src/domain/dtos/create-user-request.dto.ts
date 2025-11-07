import { BaseDTO, BaseResponseDTO } from "./base.dto";

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export type RegisterResponseDTO = BaseResponseDTO<{
  user: IUserSerialized;
  accessToken: string;
  refreshToken: string;
}>;

export interface IUserResponseDTO extends BaseDTO {
  name: string;
  email: string;
}

export interface IUserSerialized {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
}
