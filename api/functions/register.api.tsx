import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export const RegistrationFunction: MutationFunction<registerResponse> = async (payload: registerResponse) => {
    const res = await axiosInstance.post<registerResponse>(endpoints.auth.signUp, payload)
    return res.data

} 