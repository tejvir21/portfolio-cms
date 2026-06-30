import api from "../../../services/api";

export interface LoginInput {
  email: string;
  password: string;
  otp?: string;
}

export const login = async (data: LoginInput) => {
  try {
    const response = await api.post("/auth/login", data);

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
