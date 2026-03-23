
import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";
import { AxiosInstance } from "../axios/axios";

// Correct types
export const LoginFunction: MutationFunction<
  loginResponse,
  loginPayload
> = async (payload) => {
  const res = await AxiosInstance.post<loginResponse>(
    endpoints.auth.signIn,
    payload
  );

  return res.data; 
};