import { useMutation } from "@tanstack/react-query";

import { login, type LoginInput } from "../api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginInput) => login(data),
  });
};
