export interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserResponseDTO {
  success: boolean;
  message: string;
  user: IUserResponseDTO;
}
