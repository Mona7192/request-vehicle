// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/rideApi";
import type { LoginResponse } from "../types/apiTypes";

interface LoginInput {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async ({ username, password }) => {
      const res = await login(username, password);
      console.log("Login Response:", res); //  For test
      return res;
    },
  });
};
