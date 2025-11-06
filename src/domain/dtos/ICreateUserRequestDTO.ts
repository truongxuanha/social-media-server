export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
}
