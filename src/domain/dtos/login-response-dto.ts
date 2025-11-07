import { IUserSerialized } from "../interfaces/user.interface";
import { BaseResponseDTO } from "./base.dto";

export type LoginResponse = BaseResponseDTO<{
  user: IUserSerialized;
  accessToken: string;
  refreshToken: string;
}>;
