import { IUserResponseDTO } from "./ICreateUserRequestDTO";

export interface LoginResponse {
  user: IUserResponseDTO;
  accessToken: string;
  refreshToken: string;
}
