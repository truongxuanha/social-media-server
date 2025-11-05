import { IUserResponseDTO } from "./ICreateUserRequestDTO";

export interface LoginResponse {
  data: {
    user: IUserResponseDTO;
    accessToken: string;
    refreshToken: string;
  };
}
