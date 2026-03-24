


import { MutationFunction } from "@tanstack/react-query";

import { endpoints } from "../endpoints/endpoints";
import { AxiosInstance } from "../axios/axios";

// Correct types
export const RegistrationFunction: MutationFunction<
  registerResponse,
  registerPayload
> = async (payload) => {
  const res = await AxiosInstance.post<registerResponse>(
    endpoints.auth.signUp,
    payload
  );

  return res.data; 
};