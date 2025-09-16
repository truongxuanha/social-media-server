// Base interface chứa các trường cơ bản của User
export interface IUserBaseResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string; // Chuyển sang string cho FE
  updatedAt: string;
}

// Interface cho response khi tạo user mới
export interface ICreateUserApiResponse {
  success: boolean;
  data: {
    user: IUserBaseResponse;
  };
  message?: string;
}

// Interface cho response khi lấy thông tin user
export interface IGetUserApiResponse {
  success: boolean;
  data: {
    user: IUserBaseResponse;
  };
}

// Interface cho response khi có lỗi
export interface IErrorApiResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
