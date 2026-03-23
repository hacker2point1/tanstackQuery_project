
// import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../axios/axios";
// import { endpoints } from "../endpoints/endpoints";

// export const RegistrationFunction: MutationFunction<registerResponse,registerPayload> = async (payload: registerResponse) => {
//     const res = await axiosInstance.post<registerResponse>(endpoints.auth.signUp, payload)
//     return res.data

// } 


import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../axios/axios";
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