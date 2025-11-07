export interface BaseDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface BaseResponseDTO<T> {
  data: T;
}
