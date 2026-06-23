import api from "../../../services/api";

export interface LoginInput {
  email: string;
  password: string;
}

export const login = async (data: LoginInput) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
