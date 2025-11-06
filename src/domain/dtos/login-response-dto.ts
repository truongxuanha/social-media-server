import { IUserSerialized } from "../interfaces/user.interface";
import { BaseResponseDTO } from "./base.dto";

export type LoginResponse = BaseResponseDTO<{
  user: ILoginResponseSerialized;
  accessToken: string;
  refreshToken: string;
}>;

export type ILoginResponseSerialized = IUserSerialized;
